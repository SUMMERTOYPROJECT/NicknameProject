from pydantic import BaseModel


class NicknameProfileResponse(BaseModel):
    nickname: str
    profileUrl:str
