import os
import asyncio
from openai import OpenAI
from dotenv import load_dotenv
from app.dto.ProfileImageReq import ProfileImageRequest

load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

async def generate_langchain_profileImage(request: ProfileImageRequest):
    nickname = request.nickname
    description = request.description
    print(f"[OpenAI....] 닉네임 '{nickname}'과 설명 '{description}'으로 프로필 이미지 생성중.....")

    # 프롬프트를 구체적으로 작성
    prompt = (
        f"캐릭터 {nickname}의 고품질 프로필 이미지를 만들어주세요."
        f"이미지는 {nickname}에 주요 요소들을 반드시 포함해야합니다."
        f"캐릭터의 묘사된 {nickname}을 강조하는 재미있고 창의적인 요소나 액세서리를 포함시켜 주세요."
        f"캐릭터 주변 분위기는 {description}입니다. "
        "캐릭터는 재밌는 애니메이션 같은 스타일로 시각적으로 매력적이어야 하며, "
        "명확하고 친근하며 장난기 있는 표정을 지어야 합니다. "
        "캐릭터는 기억에 남고 사랑스러울 수 있도록 독특하고 귀여운 특징을 가져야 합니다. "
        "배경은 중립적이거나 부드럽게 흐려서 캐릭터에 초점을 맞춰야 합니다. "
        "조명은 부드럽고 매력적으로, 강한 그림자를 피해야 합니다. "
        
    )

    # 비동기로 OpenAI의 DALL-E API를 사용하여 이미지 생성
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(None, lambda: client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        n=1,
        size="1024x1024"
    ))

    image_url = response.data[0].url
    print(f"Generated Image URL: {image_url}")

    return {
        "nickname": nickname,
        "image_url": image_url
    }