import React, { useState, useEffect } from 'react';
import { postNicknameApi, postImageApi } from '../api/ApiNickname';
import refreshImg from '../assets/reset.png';
import cancelBtnImg from '../assets/x_button.png';
import { nicknameStyle as st } from '../style/styled'; 

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
  /* 닉네임 이전 기록 */
  const [nicknameHistory, setNicknameHistory] = useState<{ nickname: string, imageUrl: string | null }[]>([]);


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
  const showResultHandler = async (option : string) => {
    console.log("닉네임 or 닉네임+이미지 체크 확인");
    setSelectedOption(option);
    setIsLoading(true);
    setDisplayResult("닉네임 생성중");
    setImageUrl("이미지 생성중");
    try {
      const response = await postNicknameApi(info);
      if (response.status === 200) {
        setDisplayResult(response.data.nickname);
        let imageUrl = null;
  
        if (selectedOption === '닉네임 + 이미지') {
          const imageResponse = await postImageApi({
            nickname: response.data.nickname,
            description: info.description
          });
  
          if (imageResponse.status === 200) {
            imageUrl = imageResponse.data.image_url;
            setImageUrl(imageUrl);
          } else {
            console.error("Failed with status code:", imageResponse.status);
            setImageUrl(null);
          }
        }
  
        setNicknameHistory(prev => [...prev, { nickname: response.data.nickname, imageUrl }]);
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
    setIsLoading(true);
    setDisplayResult("닉네임 생성중");
    setImageUrl("이미지 생성중");
    try {
      const response = await postNicknameApi(info);
      if (response.status === 200) {
        setDisplayResult(response.data.nickname);
        let imageUrl = null;
  
        if (selectedOption === '닉네임 + 이미지') {
          const imageResponse = await postImageApi({
            nickname: response.data.nickname,
            description: info.description
          });
  
          if (imageResponse.status === 200) {
            imageUrl = imageResponse.data.image_url;
            setImageUrl(imageUrl);
          } else {
            console.error("Failed with status code:", imageResponse.status);
            setImageUrl(null);
          }
        }
  
        setNicknameHistory(prev => [...prev, { nickname: response.data.nickname, imageUrl }]);
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

  const handleNicknameClick = (nickname: string, imageUrl: string | null) => {
    setDisplayResult(nickname);
    setImageUrl(imageUrl);
  };

  return (
    <st.Background>
      <st.CenterBox>
        <st.RowContainer>
          {/* 최소 글자 수 */}
          <st.InputContainer>
            <st.TextContainer>
              <st.TextColor>*</st.TextColor><st.Text>최소 글자수</st.Text>
            </st.TextContainer>
            <st.InputData 
              name="min_length" 
              value={info.min_length} 
              onChange={handleChange} 
              type='number'
              placeholder="최소 3글자"
            />
          </st.InputContainer>
          {/* 최대 글자 수 */}
          <st.InputContainer>
            <st.TextContainer>
              <st.TextColor>*</st.TextColor><st.Text>최대 글자수</st.Text>
            </st.TextContainer>
            <st.InputData 
              name="max_length" 
              value={info.max_length} 
              onChange={handleChange} 
              type='number'
              placeholder="제한없음"
            />
          </st.InputContainer>
        </st.RowContainer>
        
        <st.RowContainer>
          {/* 포함 단어 */}
          <st.InputContainer>
            <st.TextContainer>
              <st.TextColor>*</st.TextColor><st.Text>포함 단어</st.Text>
            </st.TextContainer>
            <st.InputData name="contain_string" value={info.contain_string} onChange={handleChange}/>
          </st.InputContainer>
          {/* 이름 */}
          <st.InputContainer>
            <st.TextContainer>
              <st.TextColor>*</st.TextColor><st.Text>이름</st.Text>
            </st.TextContainer>
            <st.InputData name="user_name" value={info.user_name} onChange={handleChange}/>
          </st.InputContainer>
        </st.RowContainer>
        {/* 설명 */}
        <st.ExplanationContainer>
          <st.TextContainer>
            <st.TextColor>*</st.TextColor><st.Text>설명</st.Text>
          </st.TextContainer>
          <st.ExplanationInput name="description" value={info.description} onChange={handleChange}/>
        </st.ExplanationContainer>
        {/* 최종 버튼 */}
        <st.SubmitButton onClick={submitHandler}>입력 완료</st.SubmitButton>
      </st.CenterBox>
      {/* 닉네임 or 닉네임 + 이미지 선택 메세지 */}
      {isSelectBtnOpen && (
        <st.SelectBtnBackground>
          <st.SelectBtnContainer>
            <st.SelectCancelButton onClick={closeHandler}>
              <img src={cancelBtnImg} />
            </st.SelectCancelButton>
            <st.OptionContainer>
              <st.OptionButton
                onClick={() => showResultHandler('닉네임')}>
                  닉네임
              </st.OptionButton>
              <st.OptionButton
                onClick = {() => showResultHandler('닉네임 + 이미지')}
                >
                  닉네임 + 이미지
                </st.OptionButton>
            </st.OptionContainer>
          </st.SelectBtnContainer>
        </st.SelectBtnBackground>
      )}
      {/* 결과 표시 (image_url 여부로 구분)*/}
      {displayResult && selectedOption === '닉네임' && (
        <st.SelectBtnBackground>
            <st.NicknameDisplay>
              <st.NicknameTextContainer>
                <st.MessageTopBar/>
                <st.NicknameTextWrapper>
                  <st.NicknameText>{isLoading ? "닉네임 생성중" : displayResult}</st.NicknameText>
                </st.NicknameTextWrapper>
                <st.RefreshButton onClick={RefreshButtonHandler}>
                    <img src={refreshImg} />
                </st.RefreshButton>
                <st.CancelButton onClick={closeHandler}>
                    <img src={cancelBtnImg} />
                </st.CancelButton>
              </st.NicknameTextContainer>
              <st.NicknameListContainer>
                <st.NicknameListWrapper>
                  {nicknameHistory.map((item, index) => (
                    <st.NicknameListItem key={index}>{item.nickname}</st.NicknameListItem>
                  ))}
                </st.NicknameListWrapper>
              </st.NicknameListContainer>
            </st.NicknameDisplay>
        </st.SelectBtnBackground>
      )}
    {displayResult && selectedOption === '닉네임 + 이미지' && (
      <st.SelectBtnBackground>
        <st.NicknameImageDisplay>
          <st.NicknameImageTextContainer>
            <st.MessageTopBar />
            <st.NicknameImageTextWrapper>
              <st.NicknameImageText>{isLoading ? "닉네임 생성중" : displayResult}</st.NicknameImageText>
              {imageUrl === "이미지 생성중" ? (
                <>
                  <st.NicknameImageText>이미지 생성중</st.NicknameImageText>
                </>
              ) : (
                <st.ImageWrapper>
                  {imageUrl && <img src={imageUrl} alt='닉네임 이미지' />}
                </st.ImageWrapper>
              )}
            </st.NicknameImageTextWrapper>
            <st.RefreshButton onClick={RefreshButtonHandler}>
              <img src={refreshImg} />
            </st.RefreshButton>
            <st.CancelButton onClick={closeHandler}>
              <img src={cancelBtnImg} />
            </st.CancelButton>
          </st.NicknameImageTextContainer>
          <st.NicknameListContainer>
            <st.NicknameListWrapper>
              {nicknameHistory.map((item, index) => (
                <st.NicknameListItem key={index} onClick={() => handleNicknameClick(item.nickname, item.imageUrl)}>
                  {item.nickname}
                </st.NicknameListItem>
              ))}
            </st.NicknameListWrapper>
          </st.NicknameListContainer>
        </st.NicknameImageDisplay>
      </st.SelectBtnBackground>
    )}
    </st.Background>
  );
};

export default InfoInput;
