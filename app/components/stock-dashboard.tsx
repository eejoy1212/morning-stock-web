"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { BarChart3, Calendar, ChevronDown, TrendingUp } from "lucide-react"

import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

import { SectorPerformanceChart } from "../components/sector-performance-chart"
import { TopStocksTable } from "../components/top-stocks-table"

const sectors = [
  { name: "전체 섹터", id: "all" },
  { name: "기술", id: "tech" },
  { name: "반도체", id: "semiconductor" },
  { name: "헬스케어", id: "healthcare" },
  { name: "에너지", id: "energy" },
  { name: "금융", id: "finance" },
  { name: "소비재", id: "consumer" },
  { name: "바이오", id: "biotech" },
  { name: "엔터테인먼트", id: "entertainment" },
]

export default function StockDashboard() {
  const [selectedSector, setSelectedSector] = useState("all")
  const today = new Date()

  const selectedSectorName = sectors.find((sector) => sector.id === selectedSector)?.name || "전체 섹터"

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">주식 분석 대시보드</h1>
                <p className="text-sm text-gray-600">실시간 시장 분석 및 섹터 성과</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{format(today, "yyyy년 M월 d일 EEEE", { locale: ko })}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* 섹터 선택 및 요약 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">시장 개요ddd</h2>
            <p className="text-sm text-gray-600">오늘의 주요 섹터별 성과를 확인하세요</p>
        
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <TrendingUp className="mr-2 h-4 w-4" />
                {selectedSectorName}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>섹터 선택</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sectors.map((sector) => (
                <DropdownMenuItem
                  key={sector.id}
                  onClick={() => setSelectedSector(sector.id)}
                  className={selectedSector === sector.id ? "bg-blue-50 text-blue-700" : ""}
                >
                  {sector.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 차트 섹션 */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* 섹터 성과 차트 - 2/3 너비 */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold sm:text-xl">이번 달 가장 많이 오른 섹터</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      월간 수익률 기준 상위 섹터 (단위: %)
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    이번 달
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* 스크롤 가능한 차트 컨테이너 */}
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[500px] h-[350px] sm:h-[400px]">
                    <SectorPerformanceChart />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 상위 종목 테이블 - 1/3 너비 */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">오늘의 상승 종목</CardTitle>
                    <CardDescription className="text-sm text-gray-600">상위 5개 종목</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    실시간
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <TopStocksTable />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 추가 정보 카드들 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">코스피</p>
                  <p className="text-2xl font-bold text-gray-900">2,847.65</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600">+1.2%</p>
                  <p className="text-xs text-gray-500">+34.12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">코스닥</p>
                  <p className="text-2xl font-bold text-gray-900">891.23</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600">+0.8%</p>
                  <p className="text-xs text-gray-500">+7.12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">거래량</p>
                  <p className="text-2xl font-bold text-gray-900">4.2억</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600">평균 대비</p>
                  <p className="text-xs text-gray-500">+15%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">외국인 순매수</p>
                  <p className="text-2xl font-bold text-gray-900">1,247억</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600">매수 우위</p>
                  <p className="text-xs text-gray-500">3일 연속</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
