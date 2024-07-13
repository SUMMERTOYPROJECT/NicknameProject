# app/service/nick_service.py
from app.dto.NicknameReq import NicknameRequest
from app.dto.NicknameRes import NicknameResponse
from app.dto.ProfileImageReq import ProfileImageRequest
from app.generation.makeNickname import generate_langchain_nickname
from app.generation.makeProfile import generate_langchain_profileImage
from fastapi import HTTPException

MIN_LENGTH = 2
MAX_LENGTH = 15
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
