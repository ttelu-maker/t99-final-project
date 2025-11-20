# update_password.py
import os
import hashlib
import getpass
from dotenv import load_dotenv
from db import get_connection

load_dotenv()

USERNAME = "Tejaswini"   # change if you ever change the username

def hash_password(password: str, salt: str) -> str:
    # MUST match the logic in app.py
    return hashlib.sha256((salt + password).encode("utf-8")).hexdigest()

def main():
    print(f"Updating password for user: {USERNAME}")
    new_password = getpass.getpass("New password: ")

    if not new_password:
        print("Password cannot be empty.")
        return

    # generate a fresh random salt
    salt = os.urandom(16).hex()
    password_hash = hash_password(new_password, salt)

    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE users SET salt=%s, password_hash=%s WHERE username=%s",
        (salt, password_hash, USERNAME),
    )
    conn.commit()
    cur.close()
    conn.close()

    print("✅ Password updated successfully.")

if __name__ == "__main__":
    main()
