# src.app/service/nick_service.py
from src.app.api.nickname.schema.nickname_req import NicknameRequest
from src.app.api.nickname.schema.nickname_res import NicknameResponse
from src.app.api.nickname.schema.profileImage_req import ProfileImageRequest
from src.app.api.nickname.generation.make_nickname import generate_langchain_nickname
from src.app.api.nickname.generation.make_profile import generate_langchain_profileImage
from src.common.constants import MIN_LENGTH, MAX_LENGTH
from fastapi import HTTPException
#-- service에서는 db에서 호출

async def generate_nickname(request: NicknameRequest):
    try:
        if request.min_length < MIN_LENGTH or request.max_length > MAX_LENGTH:
            raise ValueError("Nickname length should be between {} and {} characters.").format(MIN_LENGTH, MAX_LENGTH)
        nickname = await generate_langchain_nickname(request)
        return NicknameResponse(nickname=nickname)
    except Exception as e:
        print(f"Failed to create nickname: {e}")
        raise HTTPException(status_code=500, detail="Failed to create nickname")

async def generate_profile_image(request: ProfileImageRequest):
    try:
        return await generate_langchain_profileImage(ProfileImageRequest(nickname=request.nickname, description=request.description))
    except Exception as e:
        print(f"Failed to create nickname: {e}")
        raise HTTPException(status_code=500, detail="Failed to create nickname")
