# app/repository/NickRepository.py
from app.domain.NicknameDomain import Nickname
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session


def findById(item_id: int, db: Session):
    return db.query(Nickname).filter(Nickname.id == item_id).first()

def save(nickname: Nickname, db: Session):
    try:
        db.add(nickname)
        db.commit()
        db.refresh(nickname)
        return nickname
    except SQLAlchemyError as e:
        db.rollback()  # 트랜잭션 롤백
        print(f"Error saving Nickname: {e}")  # 로그 메시지 출력
        raise  # 예외 재발생
