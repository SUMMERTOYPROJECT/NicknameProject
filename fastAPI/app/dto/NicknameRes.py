from pydantic import BaseModel


class NicknameResponse(BaseModel):
    nickname: str