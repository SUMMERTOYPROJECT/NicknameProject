# app/controllers/item_controller.py
from src.app.api.nickname.schema.nickname_req import NicknameRequest
from src.app.api.nickname.schema.profileImage_req import ProfileImageRequest
from src.package.decorators.logging_decorator import log_decorator
from src.app.api.nickname.service import nickname
from fastapi import APIRouter, HTTPException

router = APIRouter()

#-- 서버 상태 체크
@router.get("/check")
async def health_check():
    return {"message" : "It's Working On NickController Service!"}

#-- [POST 닉네임 생성]
#-- 반환 데이터 : nickname(str)

@router.post("/nickname")
@log_decorator("src/app/api/nickname")
async def generate_nickname(request: NicknameRequest):
    try:
        print("[POST] 닉네임 생성중.....")
        print("Input data minLen : {} ..... maxLen : {} .... userName: {}.... descrition: {}.....".format(request.min_length, request.max_length, request.user_name, request.description))
        return await nickname.generate_nickname(request)
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

#-- [POST 닉네임 생성 후 해당 닉네임으로 프로필 이미지까지 생성]
#-- 반환 데이터 : nickname(str), profileUrl(str)
@router.post("/profile")
async def generate_nickname_image(request: ProfileImageRequest):
    try:
        print("[POST] 프로필 이미지 생성중.....")
        print("nickName: {}.... descrition: {}.....".format(request.nickname, request.description))
        return await nickname.generate_profile_image(request)
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
