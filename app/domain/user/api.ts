import axiosInstance from "@/app/lib/base"


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