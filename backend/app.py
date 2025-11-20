import hashlib
from db import get_connection, log_login
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from datetime import datetime, timedelta
import os
import jwt
from dotenv import load_dotenv

from db import log_login

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173",  # Vite dev
    "http://localhost",       # optional
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

JWT_SECRET = os.getenv("JWT_SECRET", "change_me")
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 60

security = HTTPBearer()

class LoginRequest(BaseModel):
    username: str
    password: str

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def hash_password(password: str, salt: str) -> str:
    return hashlib.sha256((salt + password).encode("utf-8")).hexdigest()

@app.post("/api/login")
def login(req: LoginRequest):
    # 1) get user from database
    conn = get_connection()
    cur = conn.cursor(dictionary=True)
    cur.execute("SELECT id, username, salt, password_hash FROM users WHERE username=%s", (req.username,))
    row = cur.fetchone()
    cur.close()
    conn.close()

    # 2) if user not found -> invalid
    if not row:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # 3) compute hash using stored salt and given password
    expected_hash = row["password_hash"]
    computed_hash = hash_password(req.password, row["salt"])

    if computed_hash != expected_hash:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # 4) log login & issue JWT
    try:
        log_login(req.username)
    except Exception as e:
        print("Error logging login:", e)

    token = create_access_token({"sub": req.username})
    return {"token": token}



@app.get("/api/summary-chart")
def summary_chart(user: str = Depends(get_current_user)):
    return {
        "title": "Module Efficiency: Tandem vs Conventional Panels",
        "xLabel": "Panel Type",
        "yLabel": "Module Efficiency (%)",
        "data": [
            {"type": "Conventional silicon panel", "efficiency": 20.0},
            {"type": "Oxford PV tandem panel", "efficiency": 24.5}
        ],
        "source": "Oxford PV press releases on perovskite–silicon tandem solar panels."
    }

@app.get("/api/reports-chart")
def reports_chart(user: str = Depends(get_current_user)):
    return {
        "title": "Projected Installed Capacity of Tandem Panels (Scenario)",
        "xLabel": "Year",
        "yLabel": "Installed Capacity (MW)",
        "data": [
            {"year": 2025, "capacityMW": 50},
            {"year": 2026, "capacityMW": 150},
            {"year": 2027, "capacityMW": 400},
            {"year": 2028, "capacityMW": 800},
            {"year": 2029, "capacityMW": 1300},
            {"year": 2030, "capacityMW": 2000}
        ],
        "note": "Illustrative scenario inspired by plans to reach gigawatt-scale production."
    }

@app.get("/")
def root():
    return {"status": "ok", "message": "T99 backend running"}
