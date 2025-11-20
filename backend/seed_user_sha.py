import os
import hashlib
from getpass import getpass
from db import get_connection

def hash_password(password: str, salt: str) -> str:
    """Return salted SHA-256 hex digest."""
    return hashlib.sha256((salt + password).encode("utf-8")).hexdigest()

def main():
    username = input("Username: ").strip()
    password = getpass("Password: ").strip()

    # generate random salt
    salt = os.urandom(16).hex()
    password_hash = hash_password(password, salt)

    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO users (username, salt, password_hash) VALUES (%s, %s, %s)",
        (username, salt, password_hash),
    )
    conn.commit()
    cur.close()
    conn.close()

    print(f"User '{username}' created with salted hash in DB.")

if __name__ == "__main__":
    main()
