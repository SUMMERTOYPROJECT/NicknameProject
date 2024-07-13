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
        f"Create a high-quality profile image of a character named {nickname}. "
        f"The character is described as {description}. "
        "Ensure the character is visually appealing and has an animation-like style, "
        "with a clear, friendly, and playful facial expression that matches the described personality. "
        "The character should have distinct and adorable features that make them memorable and endearing. "
        "The background should be neutral or softly blurred to keep the focus on the character. "
        "The lighting should be soft and flattering, avoiding harsh shadows. "
        "Include fun and creative elements or accessories that highlight the character's described traits, "
        "such as a whimsical explorer's hat, quirky glasses, or a magical artifact."
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