// /components/KakaoLoginButton.tsx

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

export const KakaoLoginButton = () => {
  const loginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  return (
    <a href={loginUrl}>
      <button>카카오 로그인</button>
    </a>
  );
};
