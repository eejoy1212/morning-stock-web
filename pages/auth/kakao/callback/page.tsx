import { useRouter } from "next/router"
import { useEffect } from "react"
import { kakaoLogin } from "@/app/domain/user/api"

export default function KakaoCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return // 라우터 준비되었는지 확인

    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get("code")

    if (!code) return

    const handleKakaoLogin = async () => {
      try {
        const res = await kakaoLogin(code)
        if (!res.token) return
        localStorage.setItem("jwt_token", res.token)
        localStorage.setItem("login_type", "kakao")
        router.push("/")
      } catch (err) {
        console.error("카카오 로그인 실패", err)
        alert("카카오 로그인 실패")
        router.push("/login")
      }
    }

    handleKakaoLogin()
  }, [router])

  return <p>로그인 처리 중입니다...</p>
}
