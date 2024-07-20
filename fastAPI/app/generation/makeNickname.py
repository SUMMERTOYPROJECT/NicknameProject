import os
import asyncio
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
load_dotenv()

from app.dto.NicknameReq import NicknameRequest
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.chains import LLMChain
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)

async def generate_langchain_nickname(request: NicknameRequest):
    system_template = SystemMessagePromptTemplate.from_template(
        """
        "당신은 최고의 닉네임 창작자입니다. 웹사이트나 게임에서 사용될 독특하고 기억에 남을만한 닉네임을 만들어주세요. "
        "아래의 정보를 기반으로 독창적이고 재미있는 닉네임을 생성해주세요.\n"
        "결과 닉네임은 반드시 {min_length}와 {max_length} 글자 사이여야 하며 공백은 제외해주세요.\n"
        # "닉네임 타입 : {nickname_types}\n"
        "최소 글자수: {min_length}\n"
        "최대 글자수: {max_length}\n"
        "반드시 포함되어야 하는 문자: {contain_string}\n"
        "사용자 이름: {user_name}\n"
        "반환할 닉네임 언어: {language}\n"
        "설명: {mood}\n"
        "추가 지침:\n"
        "- 닉네임은 사용자의 개성과 맞아야 합니다.\n"
        "- 사용자 이름과 관련된 독특한 단어나 의미를 포함하세요.\n"
        "- 긍정적이고 재미있는 느낌을 주도록 하세요.\n"
        "- 흔하지 않은 단어 조합과 창의적인 표현을 사용하세요.\n"
        "- 다양한 문화적 요소를 반영하여 닉네임을 더욱 흥미롭게 만드세요.\n"
        "- 유머와 말장난이 포함된 닉네임을 고려하세요.\n"
        "- 다른 사람들이 쉽게 기억할 수 있도록 만드세요.\n"
        "- 예상을 벗어난 참신한 아이디어를 사용하세요.\n"
        "- 평범하지 않고 놀라운 요소를 추가하세요.\n"
        "공백 또는 특수문자 등은 추가하지 마세요.\n"
        "반드시 반드시 포함되어야 하는 문자{contain_string}를 형용사, 동사 형태로 변환 후에 {user_name}을 조합하며 {user_name}을 직접적으로 언급하면 안됩니다.\n"
        "반드시 형용사 + 명사 혹은 동사+명사 형태로 만들어주세요\n"
        "예시 : 우동뱉는백종원, 미사일을탄홍길동, 밥먹으러뛰어가는자동차...\n"
        """
    )
    
    # 시스템 메시지 생성
    system_message = system_template.format(
        nickname_types=request.nickname_types,
        min_length=request.min_length,
        max_length=request.max_length,
        contain_string=request.contain_string,
        language=request.language_types,
        user_name=request.user_name,
        mood=request.description  # 분위기를 description으로 받음
    )
    
    print("[LangChain....] 닉네임 생성중.....")

    # ChatPromptTemplate 템플릿 정의
    prompt = ChatPromptTemplate.from_messages([
        system_message,                                              # 역할부여
        HumanMessagePromptTemplate.from_template("{human_input}"),   # 사용자 메시지 injection
    ])

    # LLM 모델 정의
    llm = ChatOpenAI(model='gpt-4',
                     temperature=1.5,  # 창의적인 응답을 위해 온도를 높임
                     streaming=True,
                     callbacks=[StreamingStdOutCallbackHandler()],
                     openai_api_key=os.getenv('OPENAI_API_KEY'))

    # LLMChain 정의
    conversation = LLMChain(
        llm=llm,       # LLM
        prompt=prompt, # Prompt
        verbose=True,  # True 로 설정시 로그 출력
        memory=None    # 메모리 사용 안 함
    )

    # 비동기 실행
    answer = await asyncio.to_thread(conversation, {"human_input": "기억에 남을만한 재밌는 닉네임을 만들어줘"})

    print(answer["text"].replace('"', ''))
    return answer["text"].replace('"', '')
