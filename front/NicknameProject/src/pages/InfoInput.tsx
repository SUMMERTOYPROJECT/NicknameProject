import React, { useState, useEffect } from 'react';
import { postNicknameApi, postImageApi } from '../api/ApiNickname';
import styled from 'styled-components';
import refreshImg from '../assets/reset.png';
import cancelBtnImg from '../assets/x-button.png';

const Background = styled.div`
  background-color: #999485;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterBox = styled.div`
  width: 800px;
  height: 650px;
  background-color: #e9e6d7;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #a9a69d;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #e6e3d4;
    z-index: 0;
  }
`;

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
  display: flex;
  align-items: center;
  height: 30px;
  z-index: 2;
`;

const TopBarBtn = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 10px;

  &:nth-child(1) {
    background-color: #e63535;
  }
  &:nth-child(2) {
    background-color: #47ca77;
  }
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

const ExplanationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  width: 100%;
  margin-left: 125px;
  justify-content: flex-start;
  padding: 0 20px;
`;

const Title = styled.div`
  font-size: 40px;
  color: #333;
  text-align: center;
  font-weight: 1000;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.div`
  font-size: 16px;
  color: #333;
  text-align: left;
  font-weight: 400;
  margin-right: 10px;
  min-width: 100px;
`;

const TextColor = styled.div`
  color: #ee4a4a;
  font-size: 25px;
  margin-right: 5px;
  margin-top: 10px;
  font-weight: 600;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const DropdownButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  width: 200px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
`;

interface DropdownContentProps{
  isExpanded: boolean;
}

const DropdownContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isExpanded'
})<DropdownContentProps>`
  position: absolute;
  top: 100%;
  left: 0;
  display: ${({ isExpanded }) => (isExpanded ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  z-index: 10;
`;


const DropdownItem = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  background-color: white;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: #f1f1f1;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`;

const InputData = styled.input`
  padding: 10px 20px;
  font-size: 14px;
  width: 160px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
`;

const ExplanationInput = styled.textarea`
  padding: 10px 20px;
  font-size: 14px;
  width: 550px;
  height: 100px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  resize: none;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #5d584f;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;

  &:hover {
    background-color: #4d463d;
  }
`;

const SelectBtnBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const SelectBtnContainer = styled.div`
  width: 400px;
  height: 200px;
  padding: 20px;
  background-color: #ffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const OptionButton = styled.div<{ selected?: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px;
  height: 100px;
  color: ${({selected}) => (selected ? '#4b4542' : '#8e8787')};
  border: ${({selected}) => (selected ? '2px solid #4b4542' : '1px solid #ccc')};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;

  &:hover{
    border: 1px solid #4b4542;
    color: #4b4542;
  }
`;

const CheckMark = styled.div<{ selected?: boolean}>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #4b4542;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after{
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({selected}) => (selected ? '#4b4542' : 'transparent')};
  }
`;

const SelectButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #5d584f;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover{
    background-color: #4d463d;
  }
`;

const NicknameDisplay = styled.div`
  width: 300px;
  height: 150px;
  padding: 20px;
  background-color: #ffff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 20;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const NicknameImageText = styled.div`
  margin-top: 20px;
`;

const NicknameText = styled.div`
  /* margin-bottom: 20px; */
`;

const NicknameImageDisplay = styled.div`
  width: 300px;
  height: 400px;
  padding: 10px;
  background-color: #ffff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 20;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  img {
    width: 200px;
    height: 200px;
    border: 2px #5d584f;
  }
`;

const RefreshButton = styled.button`
  padding: 5px 5px;
  background-color: transparent;
  border: 2px solid #5d584f;
  border-radius: 50%;
  position: absolute;
  bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    border: 2px solid #4d463d;
    /* background-color: #5d584f; */
  }

  img {
    width: 12px;
    height: 12px;
  }
`;

const CancelButton = styled.button`
  padding: 5px 5px;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
  cursor: pointer;

  img {
    width: 12px;
    height: 12px;
  }
`;

const MessageTopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0px;
  height: 30px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 2px solid #d1d1d1;
  background-color: transparent;
  z-index: 1;
`;

const InfoInput = () => {

  /* Api 통신 */
  const[info, setInfo] = useState({
    nickname_types: '',
    language_types: '',
    min_length: 7,
    max_length: 15,
    contain_string: '',
    user_name: '',
    description: ''
  })

  /* 입력 타입 설정*/
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [InputType, setInputType] = useState('명사+형용사');
  const InputTypeList = ['명사+형용사'];

  /* 언어 타입 설정*/
  const [isLanguageExpanded, setIsLanguageExpanded] = useState(false);
  const [languageType, setLanguageType] = useState('선택하기');
  const languageTypeList = ['선택하기', '한국어', '영어', '한국어+영어'];

  /* 입력 완료 버튼 */
  const [isSelectBtnOpen, setIsSelectBtnOpne] = useState(false);

  /* 닉네임 or 닉네임 + 이미지 선택 버튼 */
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  /* 결과 표시 */
  const [displayResult, setDisplayResult] = useState<string | null>(null);

  /* 이미지 */
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  /* 로딩 */
  const [isLoading, setIsLoading] = useState(false);

  /* 입력 타입 실행 */
  const InputBtnExpandHandler = () => {
    setIsInputExpanded(!isInputExpanded);
  };
  const InputTypeHandler = (type: string) => {
    setInputType(type);
    setInfo({ ...info, nickname_types: type });
    setIsInputExpanded(false);
  };

  /* 언어 타입 실행 */
  const languageBtnExpandHandler = () => {
    setIsLanguageExpanded(!isLanguageExpanded);
  };
  const languageTypeHandler = (type: string) => {
    setLanguageType(type);
    setInfo({ ...info, language_types: type });
    setIsLanguageExpanded(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfo({...info, [name]:value});
  }

  /* 입력 완료 버튼 */
  const submitHandler = async () => {
    console.log("입력 완료 버튼 Click!!");
    setIsSelectBtnOpne(true);
  }

  /* 닫기 버튼 */
  const closeHandler = () => {
    setIsSelectBtnOpne(false);
    setDisplayResult(null);
    setImageUrl(null)
  }

  /* 닉네임 or 닉네임+이미지 선택 버튼 */
  const selectOptionHandler = (option : string) => {
    setSelectedOption(option);
  };

  /* 로딩 애니메이션 */
  const LoadingDots = () => {
    const [dots, setDots] = useState('');
  
    useEffect(() => {
      const interval = setInterval(() => {
        setDots(prev => (prev.length < 3 ? prev + '.' : ''));
      }, 500);
      return () => clearInterval(interval);
    }, []);
  
    return <span>{dots}</span>;
  };

  /* 결과 표시 */
  const showResultHandler = async () => {
    console.log("닉네임 or 닉네임+이미지 체크 확인");
    setIsLoading(true);
    setDisplayResult("닉네임 생성중");
    setImageUrl("이미지 생성중");
    try {
        const response = await postNicknameApi(info);
        if (response.status === 200) {
            console.log("response is :", response.status);
            setDisplayResult(response.data.nickname);

            if (selectedOption === '닉네임 + 이미지') {
                const imageResponse = await postImageApi({
                    nickname: response.data.nickname,
                    description: info.description
                });

                if (imageResponse.status === 200) {
                    setImageUrl(imageResponse.data.image_url);
                } else {
                    console.error("Failed with status code:", imageResponse.status);
                    setImageUrl(null);
                }
            }
        } else {
            console.error("Failed with status code:", response.status);
        }
        setIsSelectBtnOpne(false);
    } catch (error) {
        console.error("Error Info : ", error);
        setDisplayResult("Error occurred");
        setImageUrl(null);
    } finally {
        setIsLoading(false);
    }
  };


  /* 새로고침 버튼 */
  const RefreshButtonHandler = async () => {
    console.log("새로고침 버튼 Click!");
    setIsLoading(true);
    setDisplayResult("닉네임 생성중");
    setImageUrl("이미지 생성중");
    try {
        const response = await postNicknameApi(info);
        if (response.status === 200) {
            setDisplayResult(response.data.nickname);

            if (selectedOption === '닉네임 + 이미지') {
                const imageResponse = await postImageApi({
                    nickname: response.data.nickname,
                    description: info.description
                });

                if (imageResponse.status === 200) {
                    setImageUrl(imageResponse.data.image_url);
                } else {
                    console.error("Failed with status code:", imageResponse.status);
                    setImageUrl(null);
                }
            }
        } else {
            console.error("Failed with status code:", response.status);
        }
    } catch (error) {
        console.error("Error Info : ", error);
        setDisplayResult("Error occurred");
        setImageUrl(null);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Background>
      <CenterBox>
        <TopBar>
          <TopBarBtn />
          <TopBarBtn />
        </TopBar>
        <Title>
          NICKNAME
          <br />
          GENERATOR
        </Title>
        <RowContainer>
          
        </RowContainer>

        <RowContainer>
          {/* 최소 글자 수 */}
          <InputContainer>
            <TextContainer>
              <TextColor>*</TextColor><Text>최소 글자수</Text>
            </TextContainer>
            <InputData 
              name="min_length" 
              value={info.min_length} 
              onChange={handleChange} 
              type='number'
              placeholder="최소 3글자"
            />
          </InputContainer>
          {/* 최대 글자 수 */}
          <InputContainer>
            <TextContainer>
              <TextColor>*</TextColor><Text>최대 글자수</Text>
            </TextContainer>
            <InputData 
              name="max_length" 
              value={info.max_length} 
              onChange={handleChange} 
              type='number'
              placeholder="제한없음"
            />
          </InputContainer>
        </RowContainer>
        
        <RowContainer>
          {/* 포함 단어 */}
          <InputContainer>
            <TextContainer>
              <TextColor>*</TextColor><Text>포함 단어</Text>
            </TextContainer>
            <InputData name="contain_string" value={info.contain_string} onChange={handleChange}/>
          </InputContainer>
          {/* 이름 */}
          <InputContainer>
            <TextContainer>
              <TextColor>*</TextColor><Text>이름</Text>
            </TextContainer>
            <InputData name="user_name" value={info.user_name} onChange={handleChange}/>
          </InputContainer>
        </RowContainer>
        {/* 설명 */}
        <ExplanationContainer>
          <TextContainer>
            <TextColor>*</TextColor><Text>설명</Text>
          </TextContainer>
          <ExplanationInput name="description" value={info.description} onChange={handleChange}/>
        </ExplanationContainer>
        {/* 최종 버튼 */}
        <SubmitButton onClick={submitHandler}>입력 완료</SubmitButton>
      </CenterBox>
      {/* 닉네임 or 닉네임 + 이미지 선택 메세지 */}
      {isSelectBtnOpen && (
        <SelectBtnBackground>
          <SelectBtnContainer>
            <OptionContainer>
              <OptionButton
                selected={selectedOption === '닉네임'}
                onClick={() => selectOptionHandler('닉네임')}>
                  닉네임
                  <CheckMark selected={selectedOption === '닉네임'}/>
              </OptionButton>
              <OptionButton
                selected={selectedOption === '닉네임 + 이미지'}
                onClick = {() => selectOptionHandler('닉네임 + 이미지')}
                >
                  닉네임 + 이미지
                  <CheckMark selected={selectedOption === '닉네임 + 이미지'}/>
                </OptionButton>
            </OptionContainer>
            <SelectButton onClick={showResultHandler}>확인</SelectButton>
          </SelectBtnContainer>
        </SelectBtnBackground>
      )}
      {/* 결과 표시 (image_url 여부로 구분)*/}
      {displayResult && selectedOption === '닉네임' && (
        <SelectBtnBackground>
            <NicknameDisplay>
                <MessageTopBar/>
                <NicknameText>{isLoading ? "닉네임 생성중" : displayResult}</NicknameText>
                {isLoading && <LoadingDots />}
                <RefreshButton onClick={RefreshButtonHandler}>
                    <img src={refreshImg} />
                </RefreshButton>
                <CancelButton onClick={closeHandler}>
                    <img src={cancelBtnImg} />
                </CancelButton>
            </NicknameDisplay>
        </SelectBtnBackground>
    )}

    {displayResult && selectedOption === '닉네임 + 이미지' && (
        <SelectBtnBackground>
            <NicknameImageDisplay>
                <CancelButton onClick={closeHandler}>
                    <img src={cancelBtnImg} />
                </CancelButton>
                <MessageTopBar />
                <NicknameImageText>{displayResult}</NicknameImageText>
                {imageUrl === "이미지 생성중" ? (
                  <>
                    <NicknameImageText>이미지 생성중</NicknameImageText>
                    <LoadingDots />
                  </>
                ) : (
                  imageUrl && <img src={imageUrl} alt='닉네임 이미지' />
                )}
                <RefreshButton onClick={RefreshButtonHandler}>
                    <img src={refreshImg} />
                </RefreshButton>
            </NicknameImageDisplay>
        </SelectBtnBackground>
    )}
    </Background>
  );
};

export default InfoInput;
