import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()  # load DB_* from .env

def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "t99_app"),
    )

def log_login(username: str):
    """Insert a login record into login_log table."""
    conn = get_connection()
    cur = conn.cursor()

    # make sure the table exists (harmless if it already exists)
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS login_log (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    cur.execute(
        "INSERT INTO login_log (username) VALUES (%s)",
        (username,),
    )
    conn.commit()
    cur.close()
    conn.close()
