"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react"
import { loginUser } from "@/app/domain/user/api"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"



interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: () => void
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({ email: "", password: "", confirmPassword: "" })
  const [isLoading, setIsLoading] = useState(false)
  // const [email, setEmail] = useRecoilState(userEmailState)
  const [email, setEmail] = useState("")
  // const { toast } = useToast()


const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    const { token } = await loginUser(loginForm)

    localStorage.setItem("jwt_token", token)
    localStorage.setItem("user_email", loginForm.email)
setEmail(loginForm.email)

    // toast({
    //   title: "로그인 성공",
    //   description: "데이터 분석 기능을 사용할 수 있습니다.",
    // })
  alert("로그인 성공")

    onLoginSuccess()
    window.location.reload();
  } catch (error: any) {
    // toast({
    //   title: "로그인 실패",
    //   description: error?.response?.data?.error || "이메일 또는 비밀번호를 확인해주세요.",
    //   variant: "destructive",
    // })
      alert("로그인 실패")
  } finally {
    setIsLoading(false)
  }
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border shadow-lg">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl lg:text-2xl font-bold text-center">주식 분석 플랫폼</DialogTitle>
          <DialogDescription className="text-base lg:text-lg text-center text-gray-700">
            데이터 분석 및 엑셀 다운로드 기능을 사용하려면 로그인이 필요합니다
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-10 lg:h-12 text-base lg:text-lg">
            <TabsTrigger value="login" className="text-base lg:text-lg font-semibold">
              로그인
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-base lg:text-lg font-semibold">
              회원가입
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border">
              <CardHeader className="pb-3 lg:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <LogIn className="h-5 w-5 lg:h-6 lg:w-6" />
                  로그인
                </CardTitle>
                <CardDescription className="text-sm lg:text-base text-gray-600">
                  계정에 로그인하여 모든 기능을 사용하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm lg:text-base font-semibold">
                      이메일 주소
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@email.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                      className="h-9 lg:h-10 text-sm lg:text-base border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm lg:text-base font-semibold">
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
                        className="h-9 lg:h-10 text-sm lg:text-base border pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-9 lg:h-10 text-sm lg:text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? "로그인 중..." : "로그인"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border">
              <CardHeader className="pb-3 lg:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <UserPlus className="h-5 w-5 lg:h-6 lg:w-6" />
                  회원가입
                </CardTitle>
                <CardDescription className="text-sm lg:text-base text-gray-600">
                  새 계정을 만들어 서비스를 이용하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm lg:text-base font-semibold">
                      이메일 주소
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="example@email.com"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      required
                      className="h-9 lg:h-10 text-sm lg:text-base border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm lg:text-base font-semibold">
                      비밀번호
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      required
                      className="h-9 lg:h-10 text-sm lg:text-base border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm lg:text-base font-semibold">
                      비밀번호 확인
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="비밀번호를 다시 입력하세요"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      required
                      className="h-9 lg:h-10 text-sm lg:text-base border"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-9 lg:h-10 text-sm lg:text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? "가입 중..." : "회원가입"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
