import axiosInstance from "@/app/lib/base"
import axios from "axios";


interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
}

export async function loginUser({ email, password }: LoginInput): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>('/user/login', {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || '로그인에 실패했습니다');
  }
}
export const logoutUser = async () => {
  try {
 const res=   await axiosInstance.post('/user/logout') // 서버에 요청 (세션 기반은 아니지만 형식상 호출)
return res.data.success;  
} catch (error) {
    console.warn('서버 로그아웃 요청 실패:', error)
  } finally {
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('user_email')
  }
}
interface KakaoLoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  error?: string;
}

export const kakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
  try {
    const response = await axiosInstance.post('/user/kakao-login', { code });
    return {
      success: response.data.success,
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error: any) {
    console.error('카카오 로그인 오류:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error || '카카오 로그인 요청 중 오류 발생',
    };
  }
};
