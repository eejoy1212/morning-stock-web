"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { BarChart, Bell, ChevronDown, CirclePlus, Home, LineChart, Menu, PieChart, Settings, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { SectorTrendChart } from "@/components/sector-trend-chart"
import { StockTable } from "@/components/stock-table"
import { SectorPerformanceChart } from "@/components/sector-performance-chart"
import { CustomSectorManager } from "@/components/custom-sector-manager"

const sectors = [
  { name: "기술", id: "tech" },
  { name: "헬스케어", id: "healthcare" },
  { name: "금융", id: "finance" },
  { name: "소비재", id: "consumer" },
  { name: "에너지", id: "energy" },
  { name: "엔터테인먼트", id: "entertainment" },
  { name: "반도체", id: "semiconductor" },
  { name: "바이오", id: "biotech" },
  { name: "통신", id: "telecom" },
  { name: "부동산", id: "realestate" },
]

const customSectors = [
  { name: "내 기술주 선택", id: "mytech" },
  { name: "은퇴 자금", id: "retirement" },
]

export default function DashboardView() {
  const [selectedSector, setSelectedSector] = useState("tech")
  const today = new Date()

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-6 text-lg font-medium">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                <LineChart className="h-6 w-6" />
                <span>주식 인사이트</span>
              </a>
              <div className="grid gap-3">
                <a href="#" className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  대시보드
                </a>
                <a href="#" className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />내 포트폴리오
                </a>
                <a href="#" className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  시장 개요
                </a>
                <a href="#" className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  설정
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <LineChart className="h-6 w-6" />
          <span className="text-xl font-semibold tracking-tight">주식 인사이트</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="text-sm text-muted-foreground">{format(today, "yyyy년 M월 d일 EEEE", { locale: ko })}</div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-4 w-4" />
            <span className="sr-only">알림</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-4 w-4" />
                <span className="sr-only">사용자 메뉴</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>내 계정</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>프로필</DropdownMenuItem>
              <DropdownMenuItem>설정</DropdownMenuItem>
              <DropdownMenuItem>도움말</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-4 p-4">
              <div>
                <h3 className="mb-2 px-4 text-sm font-medium">시장 섹터</h3>
                <div className="grid gap-1">
                  {sectors.map((sector) => (
                    <Button
                      key={sector.id}
                      variant={selectedSector === sector.id ? "secondary" : "ghost"}
                      className="justify-start font-normal"
                      onClick={() => setSelectedSector(sector.id)}
                    >
                      {sector.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between px-4">
                  <h3 className="text-sm font-medium">내 관심 섹터</h3>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <CirclePlus className="h-4 w-4" />
                    <span className="sr-only">관심 섹터 추가</span>
                  </Button>
                </div>
                <div className="grid gap-1">
                  {customSectors.map((sector) => (
                    <Button
                      key={sector.id}
                      variant={selectedSector === sector.id ? "secondary" : "ghost"}
                      className="justify-start font-normal"
                      onClick={() => setSelectedSector(sector.id)}
                    >
                      {sector.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <h1 className="flex-1 text-2xl font-semibold tracking-tight">대시보드</h1>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hidden md:flex">
                    {sectors.find((s) => s.id === selectedSector)?.name ||
                      customSectors.find((s) => s.id === selectedSector)?.name}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>시장 섹터</DropdownMenuLabel>
                  {sectors.map((sector) => (
                    <DropdownMenuItem key={sector.id} onClick={() => setSelectedSector(sector.id)}>
                      {sector.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>내 관심 섹터</DropdownMenuLabel>
                  {customSectors.map((sector) => (
                    <DropdownMenuItem key={sector.id} onClick={() => setSelectedSector(sector.id)}>
                      {sector.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="custom-sectors">내 관심 섹터</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-medium">오늘의 급등 종목 Top 5</CardTitle>
                    <Badge variant="outline">오늘</Badge>
                  </CardHeader>
                  <CardContent>
                    <StockTable />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-medium">이번 달 가장 많이 오른 섹터</CardTitle>
                    <Badge variant="outline">이번 달</Badge>
                  </CardHeader>
                  <CardContent>
                    <SectorPerformanceChart />
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-medium">
                    {sectors.find((s) => s.id === selectedSector)?.name ||
                      customSectors.find((s) => s.id === selectedSector)?.name}{" "}
                    섹터 추세
                  </CardTitle>
                  <CardDescription>최근 6개월 성과</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <SectorTrendChart sectorId={selectedSector} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="custom-sectors" className="space-y-4">
              <CustomSectorManager />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
