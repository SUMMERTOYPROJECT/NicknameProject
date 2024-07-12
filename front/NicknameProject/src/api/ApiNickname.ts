import { apiClient } from "./ApiClient";

/* 입력 데이터 */
interface Info {
    nickname_types: string;
    language_types: string;
    min_length: number;
    max_length: number;
    contain_string: string;
    user_name: string;
    description: string;
}

/* 요청 */
export const postNicknameApi = (info: Info) => apiClient.post('/nickname', info);

/* 닉네임 + 이미지 */
export const postNicknameImageApi = (info: Info) => apiClient.post('/nickname/profile', info);
