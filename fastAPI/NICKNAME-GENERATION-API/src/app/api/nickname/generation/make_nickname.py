import os
import asyncio
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
load_dotenv()

from src.app.api.nickname.schema.nickname_req import NicknameRequest
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
        당신은 최고의 닉네임 창작자입니다. 독특하고 기억에 남을만한 닉네임을 만들어주세요.
        아래의 정보를 기반으로 독창적이고 재미있는 닉네임을 생성해주세요:
        최소 글자수: {min_length}
        최대 글자수: {max_length}
        반드시 포함되어야 하는 문자: {contain_string}
        사용자 이름: {user_name}
        반환할 닉네임 언어: {language}
        설명: {mood}
        추가 지침:
        
        닉네임에 이름이 정확하게 노출되지 않고 비밀스럽게 드러나게 해주세요. (예: 이름이 최병우라면 -> 병 우유)
        닉네임을 창의적으로 만들어주세요.
        필수 단어의 위치는 자유롭게 배치해주세요.
        닉네임 구조는 '명사 + 동적인 형용사 + 명사' 형식으로 만들어주세요.
        닉네임은 말이 안 되는 뜬금없는 느낌으로 만들어주세요.
        예시: 미사일을 던지는 곰, 용암을 마시는 파라오, 휴지통을 타는 백곰
        공백 또는 특수문자 등은 추가하지 마세요.
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
