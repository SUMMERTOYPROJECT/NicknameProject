# app/models/nickname_model.py
from pydantic import BaseModel


class ProfileImageRequest(BaseModel):
    nickname: str
    description: str
