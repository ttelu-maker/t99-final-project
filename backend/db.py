import mysql.connector
import os

def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "t99_app")
    )

def log_login(username: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO login_audit (username) VALUES (%s)", (username,))
    conn.commit()
    cur.close()
    conn.close()
