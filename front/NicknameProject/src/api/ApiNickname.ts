import { apiClient } from "./ApiClient";

/* 닉네임 입력 데이터 */
interface NicknameInfo {
    nickname_types: string;
    language_types: string;
    min_length: number;
    max_length: number;
    contain_string: string;
    user_name: string;
    description: string;
}

/* 이미지 입력 데이터 */
interface ImageInfo {
    nickname: string;
    description: string;
}

/* 닉네임 요청 */
export const postNicknameApi = (info: NicknameInfo) => apiClient.post('/nickname', info);

/* 이미지 요청 */
export const postImageApi = (info: ImageInfo) => apiClient.post('/profile', info);
