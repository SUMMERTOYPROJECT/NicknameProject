# app/controllers/item_controller.py
from config import get_db
from app.dto.NicknameReq import NicknameRequest
from app.service import NickService
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()



#-- 서버 상태 체크
@router.get("/")
def health_check():
    return {"message" : "It's Working On NickController Service!"}

#-- [POST 닉네임 생성]
#-- 반환 데이터 : nickname(str)
@router.post("/nickname/")
def generate_nickname(request: NicknameRequest, db: Session = Depends(get_db)):
    try:
        print("[POST] 닉네임 생성중.....")
        print("Input data minLen : {} ..... maxLen : {} .... userName: {}.... descrition: {}.....".format(request.min_length, request.max_length, request.user_name, request.description))
        return NickService.generate_nickname(request, db)
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

#-- [POST 닉네임 생성 후 해당 닉네임으로 프로필 이미까지 생성]
#-- 반환 데이터 : nickname(str), profileUrl(str)
@router.post("/nickname/profile")
def generate_nickname_image(request: NicknameRequest, db: Session = Depends(get_db)):
    try:
        print("[POST] 닉네임 + 이미지 생성중.....")
        print("Input data minLen : {} ..... maxLen : {} .... userName: {}.... descrition: {}.....".format(request.min_length, request.max_length, request.user_name, request.description))
        return NickService.generate_nickname_profile_image(request, db)
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
