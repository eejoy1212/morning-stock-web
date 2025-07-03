// app/auth/kakao/callback/page.tsx

"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { kakaoLogin } from "@/app/domain/user/api" // 실제 API 경로로 수정

export default function KakaoCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get("code")
    if (!code) return

    const handleKakaoLogin = async () => {
      try {
        const res = await kakaoLogin(code)
        // Replace 'accessToken' with the actual property name if different
        if (!res.token)return
        localStorage.setItem("jwt_token", res.token)
        localStorage.setItem("login_type","kakao")
        router.push("/") // 로그인 성공 후 메인 페이지 이동
      } catch (err) {
        console.error("카카오 로그인 실패", err)
        alert("카카오 로그인 실패")
        router.push("/login") // 실패 시 로그인 페이지로
      }
    }

    handleKakaoLogin()
  }, [searchParams])

  return <p>로그인 처리 중입니다...</p>
}
