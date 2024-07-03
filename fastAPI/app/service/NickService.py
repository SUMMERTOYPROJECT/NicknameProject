from app.domain.NicknameDomain import Nickname
from app.dto.NicknameReq import NicknameRequest
from app.dto.NicknameRes import NicknameResponse
from app.dto.ProfileImageReq import ProfileImageRequest
from app.generation.makeNickname import generate_langchain_nickname
from app.generation.makeProfile import generate_langchain_profileImage
from app.repository import NickRepository
from fastapi import HTTPException
from sqlalchemy.orm import Session

#-- service에서는 db에서 호출


def getNickname(item_id: int,  db: Session):

    db_item = NickRepository.findById(item_id,db)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

def generate_nickname(request: NicknameRequest, db: Session):
    try:
        if request.min_length < 3 or request.max_length > 15:
            raise ValueError("Nickname length should be between 3 and 15 characters.")
        nickname = generate_langchain_nickname(request)
        db_item = Nickname(name=request.user_name, description=request.description)
        NickRepository.save(db_item, db)
        return NicknameResponse(nickname = nickname)
    except Exception as e:
        print(f"Failed to create nickname: {e}")
        raise HTTPException(status_code=500, detail="Failed to create nickname")


def generate_nickname_profile_image(request: NicknameRequest, db: Session):
    try:
        respones = generate_nickname(request= request, db= db) #-- 닉네임 얻고 해당 닉네임과 설명으로 다시 이미지 생성
        url = generate_langchain_profileImage(ProfileImageRequest(nickname= respones.nickname, description=request.description))
        return url

    except Exception as e:
        print(f"Failed to create nickname: {e}")
        raise HTTPException(status_code=500, detail="Failed to create nickname")