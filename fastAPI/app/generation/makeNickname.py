import os

from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
load_dotenv()


from app.dto.NicknameReq import NicknameRequest
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.chains import LLMChain
from langchain.memory import ConversationSummaryBufferMemory
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
)


def generate_langchain_nickname(request: NicknameRequest):
    system_template = SystemMessagePromptTemplate.from_template(
        "너는 닉네임 생성 전문가야. 아래 정보를 바탕으로 재미있고 센스있는 닉네임을 생성해줘.\n"
        "최종 결과는 반드시 {min_length}과 {max_length}사이에 글자수 닉네임만 딱 반환하고 공백은 제거하도록 해.\n"
        "닉네임 타입 : {nickname_types}\n"
        "최소 글자수: {min_length}\n"
        "최대 글자수: {max_length}\n"
        "반드시 들어가야하는 문자: {contain_string}\n"
        "사용자 이름: {user_name}\n"
        "반환할 닉네임 언어: {language}\n"
        "설명: {mood}\n"
        "추가 정보:\n"
        "- 닉네임은 기억에 남을만한 단어를 사용해야 해.\n"
        "- 사용자 이름과 관련된 단어나 의미를 포함해봐.\n"
        "- 가능한 한 긍정적이고 재미있는 느낌을 주도록 해."
)
    # 시스템 메시지 생성
    system_message = system_template.format(
        nickname_types = request.nickname_types,
        min_length=request.min_length,
        max_length=request.max_length,
        contain_string = request.contain_string,
        language = request.language_types,
        user_name=request.user_name,
        mood=request.description  # 분위기를 description으로 받음
    )
    print("[LangChain....] 닉네임 생성중.....")

    # 2) ChatPromptTemplate 템플릿 정의
    prompt = ChatPromptTemplate.from_messages([
        system_message,                                              # 역할부여
        MessagesPlaceholder(variable_name="chat_history"),           # 메모리 저장소 설정. ConversationBufferMemory의 memory_key 와 동일하게 설정
        HumanMessagePromptTemplate.from_template("{human_input}"),   # 사용자 메시지 injection
    ])

    # 3) LLM 모델 정의
    llm = ChatOpenAI(model='gpt-4',
                     temperature=1.2,  # 창의적인 응답을 위해 온도를 높임
                     streaming=True,
                     callbacks=[StreamingStdOutCallbackHandler()],
                     openai_api_key=os.getenv('OPENAI_API_KEY'))

    # 4) 메모리 정의
    memory = ConversationSummaryBufferMemory(llm=llm,
                                             memory_key="chat_history",
                                             max_token_limit=10,
                                             return_messages=True
                                            )

    # 5) LLMChain 정의
    conversation = LLMChain(
        llm=llm,       # LLM
        prompt=prompt, # Prompt
        verbose=True,  # True 로 설정시 로그 출력
        memory=memory  # 메모리
    )

    # 6) 실행
    answer = conversation({"human_input": "기억에 남을만한 재밌는 닉네임을 만들어줘"})

    print(answer["text"].replace('"', ''))
    return answer["text"].replace('"', '')