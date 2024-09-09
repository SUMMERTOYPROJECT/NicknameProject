import styled from 'styled-components';
import background from '../assets/background.png'

const Background = styled.div`
  background-image: url(${background});
  background-size: cover;      
  background-position: center; 
  background-repeat: no-repeat;
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
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
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
  justify-content: space-between;
  width: 70%;
  padding: 0 20px;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const ExplanationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: center;
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
  justify-content: flex-start;
  align-items: center;
`;

const Text = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 600;
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

const InputData = styled.input`
  padding: 10px 20px;
  font-size: 14px;
  width: 200px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;

  @media (max-width: 768px) { /* 태블릿 이하 */
    width: 150px;
  }
  @media (max-width: 480px) { /* 모바일 기기 */
    width: 100px;
  }
`;

const ExplanationInput = styled.textarea`
  padding: 10px 20px;
  font-size: 14px;
  width: 100%; /* 부모 요소에 따라 너비가 유동적으로 변함 */
  max-width: 540px; /* 최대 너비는 540px */
  height: 100px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  resize: none;
  box-sizing: border-box;

  @media (max-width: 768px) { width: 96%; }
  @media (max-width: 480px) { width: 105%; }
  @media (max-width: 430px) { width: 100%; }
  @media (max-width: 390px) { width: 110%; }
  @media (max-width: 375px) { width: 115%; }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  width: 200px;
  font-size: 16px;
  color: white;
  font-weight: 700;
  background-image: linear-gradient(45deg, #3A73E3, #FA0CFF);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;
  justify-content: center;
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
  height: 150px;
  padding: 20px;
  background-image: linear-gradient(45deg, #3A73E3, #FA0CFF);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const OptionButton = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  margin: 10px;
  height: 100px;
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;

  &:hover{
    border: 2px solid #ffad0a;
    color: #ffad0a;
  }
`;

const SelectCancelButton = styled.button`
  padding: 3px 3px;
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;

const NicknameDisplay = styled.div`
  width: 400px;
  height: 200px;
  padding: 20px;
  background-image: linear-gradient(45deg, #3A73E3, #FA0CFF);
  border-radius: 10px;
  display: flex;
  /* justify-content: center; */
  justify-content: space-between;
  /* align-items: center; */
  align-items: flex-start;
  flex-direction: row;
  /* flex-direction: column; */
  position: relative;
  z-index: 20;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
`;

const NicknameTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
`;

const NicknameTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 100%;
`;

const NicknameListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 20px;
  /* border-left: 1px solid #ccc; */
  height: 100%;
  width: 50%;
  overflow-y: auto;
`;

const NicknameListWrapper = styled.div`
  overflow-y: auto;
  padding: 10px;
  height: 80%;
  width: 100%;
  margin-top: 30px;
  `;

const NicknameListItem = styled.div`
  font-size: 14px;
  color: #ffffff;
  border-bottom: 1.5px #ffffff;
  margin-top: 14px;
`;

const NicknameImageText = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  color: white;
  font-weight: 700;
`;

const NicknameText = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  color: white;
  font-weight: 700;
`;

const NicknameImageDisplay = styled.div`
  width: 600px;
  height: 400px;
  padding: 20px;
  background-image: linear-gradient(45deg, #3A73E3, #FA0CFF);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: relative;
  z-index: 20;

  img {
    width: 200px;
    height: 200px;
    border: 2px #ffffff;
  }
`;

const NicknameImageTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
`;

const NicknameImageTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 100%;
`;

const ImageWrapper = styled.div`
  margin-top: 20px;
  img {
    width: 200px;
    height: 200px;
    border: 2px solid rgb(255, 168, 6);
  }
`;

const RefreshButton = styled.button`
  padding: 5px 5px;
  background-color: transparent;
  border: 2px solid #ffffff;
  border-radius: 50%;
  position: absolute;
  bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

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
    width: 16px;
    height: 16px;
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
  border-bottom: 1.5px solid #ffffff;
  background-color: transparent;
  z-index: 1;
  `;

export const nicknameStyle = {
    Background,
    CenterBox,
    TopBar,
    TopBarBtn,
    RowContainer,
    InputContainer,
    ExplanationContainer,
    Title,
    TextContainer,
    Text,
    TextColor,
    InputData,
    ExplanationInput,
    SubmitButton,
    SelectBtnBackground,
    SelectBtnContainer,
    OptionContainer,
    OptionButton,
    SelectCancelButton,
    NicknameDisplay,
    NicknameTextContainer,
    NicknameTextWrapper,
    NicknameListContainer,
    NicknameListWrapper,
    NicknameListItem,
    NicknameImageText,
    NicknameText,
    NicknameImageDisplay,
    NicknameImageTextContainer,
    NicknameImageTextWrapper,
    ImageWrapper,
    RefreshButton,
    CancelButton,
    MessageTopBar
  };