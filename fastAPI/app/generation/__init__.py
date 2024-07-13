import os
from app.dto.ProfileImageReq import ProfileImageRequest
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def generate_langchain_profileImage(request: ProfileImageRequest):
    nickname = request.nickname
    description = request.description
    print(f"[OpenAI....] 닉네임 '{nickname}'과 설명 '{description}'으로 프로필 이미지 생성중.....")

    # OpenAI의 DALL-E API를 사용하여 이미지 생성
    response = client.images.generate(
        model="dall-e-3",
        prompt=(
            f"Create a cute and fun anime-style profile image for the nickname '{nickname}'. "
            f"The character should have a friendly and adorable appearance with big, sparkling eyes, a happy smile, "
            f"and a charming expression. The image should include the nickname '{nickname}' prominently. Use bright and cheerful colors "
            f"like pastel pink, blue, yellow, and green. The background should be soft and pleasant, enhancing the character's features. "
            f"The character should be holding a piece of cheese and standing in front of a maze, symbolizing wisdom and adaptability. "
            f"The description for the image is: {description}. Make sure the image is very cute, appealing, and positive. "
            f"Avoid any dark, scary, or negative elements."
        ),
        n=1,
        size="1024x1024"
    )

    image_url = response.data[0].url
    print(f"Generated Image URL: {image_url}")

    return {
        "nickname": nickname,
        "image_url": image_url
    }