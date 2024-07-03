# app/models/nickname_model.py
from pydantic import BaseModel


class NicknameRequest(BaseModel):
    nickname_types: str #-- 명사, 형용사, 동사, 형+명, 동+명
    min_length: int
    max_length: int
    contain_string: str #-- 반드시 포함해야하는 글자
    language_types : str #-- 언어 타입
    user_name: str
    description: str
