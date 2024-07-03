# app/db.py
from app.domain.NicknameDomain import SessionLocal
from sqlalchemy.orm import Session


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        db.close()
