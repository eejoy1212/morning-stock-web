"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


// import { useToast } from "@/hooks/use-toast"

interface LoginPageProps {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({ email: "", password: "", confirmPassword: "" })
  const [isLoading, setIsLoading] = useState(false)
  // const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (loginForm.email && loginForm.password) {
        const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.token"
        localStorage.setItem("jwt_token", mockToken)
        localStorage.setItem("user_email", loginForm.email)

        // toast({
        //   title: "로그인 성공",
        //   description: "대시보드로 이동합니다.",
        // })
        onLogin()
      } else {
        // toast({
        //   title: "로그인 실패",
        //   description: "이메일과 비밀번호를 확인해주세요.",
        //   variant: "destructive",
        // })
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (signupForm.password !== signupForm.confirmPassword) {
      // toast({
      //   title: "회원가입 실패",
      //   description: "비밀번호가 일치하지 않습니다.",
      //   variant: "destructive",
      // })
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      if (signupForm.email && signupForm.password) {
        // toast({
        //   title: "회원가입 성공",
        //   description: "로그인 탭으로 이동하여 로그인해주세요.",
        // })
        setSignupForm({ email: "", password: "", confirmPassword: "" })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">주식 분석 플랫폼</h1>
          <p className="text-lg text-gray-700">스마트한 투자 분석을 시작하세요</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-14 text-lg">
            <TabsTrigger value="login" className="text-lg font-semibold">
              로그인
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-lg font-semibold">
              회원가입
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-2 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <LogIn className="h-7 w-7" />
                  로그인
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  계정에 로그인하여 대시보드에 접속하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="login-email" className="text-lg font-semibold">
                      이메일 주소
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@email.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                      className="h-14 text-lg border-2"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="login-password" className="text-lg font-semibold">
                      비밀번호
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력하세요"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                        className="h-14 text-lg border-2 pr-14"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-14 text-lg font-semibold" disabled={isLoading}>
                    {isLoading ? "로그인 중..." : "로그인"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-2 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <UserPlus className="h-7 w-7" />
                  회원가입
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  새 계정을 만들어 서비스를 이용하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="signup-email" className="text-lg font-semibold">
                      이메일 주소
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="example@email.com"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      required
                      className="h-14 text-lg border-2"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="signup-password" className="text-lg font-semibold">
                      비밀번호
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      required
                      className="h-14 text-lg border-2"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="confirm-password" className="text-lg font-semibold">
                      비밀번호 확인
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="비밀번호를 다시 입력하세요"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      required
                      className="h-14 text-lg border-2"
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 text-lg font-semibold" disabled={isLoading}>
                    {isLoading ? "가입 중..." : "회원가입"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
