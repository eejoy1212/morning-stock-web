"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  LogOut,
  Plus,
  Settings,
  TrendingUp,
  User,
  Zap,
  Home,
  Building2,
  Menu,
  PlusSquare,
  ChevronsRight,
  ChevronRight,
  CircleDollarSign,
  Banknote,
  Globe,
  Activity,
  Lock,
} from "lucide-react"




import CustomDataTable, { DailyRow, Group } from "./custom-data-table"
import NewsTicker, { NewsArticle } from "./news-ticker"
import StockLineChart from "./stock-line-chart"
import { DataControlPanel } from "./data-control-panel"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { fetchMonthlyTopSectors, fetchSectorNews, fetchSectors, MonthlyTopSector, Sector } from "@/app/domain/sector/api"
import { fetchSectorPrices, SectorPriceData } from "@/app/domain/daily-price/api"
import { logoutUser } from "@/app/domain/user/api"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { TopStocksTable } from "../top-stocks-table"
import { CustomSectorManager } from "./custom-sector-manager"
import { CreateSectorModal } from "../modals/create-sector-modal"
import MarketCapTable from "./market-cap-table"
import MarketCapPage from "./market-cap-page"
import GainerPage from "./gainer-page"
import TopTradeAmountPage from "./top-trade-amount-page"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"


interface CustomSector {
  id: string
  name: string
  companies: string[]
}

interface DashboardPageProps {
  isAuthenticated: boolean
  onLoginRequired: () => void
  onLogout: () => void
}

export default function DashboardPage({ isAuthenticated, onLoginRequired, onLogout }: DashboardPageProps) {
  const [selectedSector, setSelectedSector] = useState("all")
  const [customSectors, setCustomSectors] = useState<Sector[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [activeTab, setActiveTab] = useState("overview")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
const [news,setNews]=useState<NewsArticle[]>([]);
const [sectorNames,setSectorNames]=useState<string[]>([])
  const [monthylSectors, setMonthlySectors] = useState<MonthlyTopSector[]>([])
  // 시장개요 화면 변수
  const [isOverviewLoading, setIsOverviewLoading] = useState(true)
const fetchMonthlyData=async()=>{
  const res=await  fetchMonthlyTopSectors();
  setMonthlySectors(res)
  console.log(res)
  
}
  useEffect(() => {
    fetchMonthlyData()
  }, [])
  // const [userEmail, setEmail] = useRecoilState(userEmailState)
    const [userEmail, setEmail] = useState("")
  // const { toast } = useToast()

  const today = new Date()

useEffect(() => {
  fetchNews()
  const savedEmail = localStorage.getItem("user_email")
  if (savedEmail) {
    setEmail(savedEmail) // ✅ Recoil 상태에 반영
  }

 
}, [])
const fetchNews=async()=>{
  const res=await fetchSectorNews()
  setNews(res.articles)
  setSectorNames(res.sectorNames)
  setIsOverviewLoading(false)
}
 const fetchData = async () => {

    const res = await fetchSectors("",1, 100)
    console.log("sectors>>>", res)
     const savedSectors = res.sectors;
  if (savedSectors) {
    setCustomSectors(res.sectors)
  }
  }
useEffect(() => {
 if (!isAuthenticated) return;
  fetchData()
}, [showCreateModal])

  const handleLogout = async () => {
  const res=await logoutUser()
  console.log(res)
  if (res) {
    alert("로그아웃 완료!")

    onLogout()
window.location.reload();
  } else {
     alert("로그아웃 실패!")
  }

  }

  const handleCreateSector = (sectorName: string) => {
    // const newSector: CustomSector = {
    //   id: Date.now().toString(),
    //   name: sectorName,
    //   companies: [],
    // }
    // const updatedSectors = [...customSectors, newSector]
    // setCustomSectors(updatedSectors)
    // localStorage.setItem("custom_sectors", JSON.stringify(updatedSectors))
    setShowCreateModal(false)

    // toast({
    //   title: "섹터 생성 완료",
    //   description: `"${sectorName}" 섹터가 생성되었습니다.`,
    // })
  }

  const handleGenerateData = async() => {
    if (!isAuthenticated) {
      onLoginRequired()
      return
    }
    const res=await fetchSectorPrices()
    console.log(res)
  }

  const handleDownloadExcel = () => {
    if (!isAuthenticated) {
      onLoginRequired()
      return
    }


    // toast({
    //   title: "엑셀 다운로드",
    //   description: "엑셀 파일 다운로드가 시작됩니다.",
    // })

  }

  const sectors = [
    { name: "전체 섹터", id: "all" },
    ...customSectors.map((sector) => ({ name: sector.name, id: sector.id })),
  ]

  const selectedSectorName = sectors.find((sector) => sector.id === selectedSector)?.name || "전체 섹터"
  const handleFill = async () => {

    const res = await fetch('/api/fillsheet');
    const result = await res.json();

  };


const navigationGroups = [
  {
    title: "대시보드",
    items: [
      { id: "overview", label: "시장 개요", icon: Home },
      { id: "sectors", label: "섹터 관리", icon: Building2 },
      { id: "analysis", label: "데이터 분석", icon: BarChart3 },
    ],
  },
  {
    title: "TOP 랭킹",
    items: [
      { id: "gainer", label: "오늘의 급등 종목 TOP 20", icon: TrendingUp },
      { id: "market-cap", label: "시가총액 TOP 50", icon: CircleDollarSign },
      { id: "bank", label: "기관매수 TOP 20", icon: Banknote },
      { id: "globe", label: "외국인 매수 TOP 20", icon: Globe },
      { id: "trade-amount", label: "오늘의 거래대금 TOP 20", icon: Activity },
    ],
  },
]
  const SidebarContent = () => (
        <div className="flex flex-col justify-between h-full bg-white border-r ">
      {/* 상단 로고 및 날짜 */}
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg bg-blue-600 shadow">
            <BarChart3 className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight tracking-tight">
              <span className="text-gray-900">모닝</span>
              <span className="text-blue-600 ml-1">스탁</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold bg-gray-50 px-3 py-2 rounded-lg border">
          <Calendar className="h-4 w-4" />
          <span>{format(today, "yyyy년 M월 d일 EEEE", { locale: ko })}</span>
        </div>
      </div>

      {/* 메뉴 항목 */}
      <nav className="flex-1 px-3 lg:px-4 py-4 overflow-y-auto">
        <div className="space-y-5">
          {navigationGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 px-2 uppercase tracking-wide">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
           item.id==="sectors"||item.id==="analysis"?<TooltipProvider key={item.id}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
                    key={item.id}
                    disabled={!isAuthenticated}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className={`w-full justify-start text-sm lg:text-[15px] font-medium h-10 rounded-md transition ${
                      activeTab === item.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.label}
                {!isAuthenticated && <Lock className="mr-3 h-4 w-4" />}
                  </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className={cn(isAuthenticated?"opacity-0":"opacity-100")}>
          로그인해야 사용 가능합니다.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>:  item.id==="bank"||item.id==="globe"?    <TooltipProvider key={item.id}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
                    key={item.id}
                    disabled={true}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className={`w-full justify-start text-sm lg:text-[15px] font-medium h-10 rounded-md transition ${
                      activeTab === item.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.label}
              {/* <Lock className="mr-3 h-4 w-4" /> */}
              
              <span className="ml-[8px]">🚧 </span>
                  </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          준비중 입니다.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>: <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className={`w-full justify-start text-sm lg:text-[15px] font-medium h-10 rounded-md transition ${
                      activeTab === item.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.label}
       
                  </Button>
                ))}
                 
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* 하단 유저 정보 */}
      <div className="p-3 lg:p-4 border-t border-gray-200">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between text-sm lg:text-base font-medium h-10"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={undefined} alt="avatar" />
                    <AvatarFallback>원희</AvatarFallback>
                  </Avatar>
                  <span className="truncate text-sm lg:text-base font-medium text-gray-800">
                    안녕하세요, 원희 님
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 lg:w-64">
              <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> 설정
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> 로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={onLoginRequired}
            className="w-full text-sm font-semibold h-10"
          >
            <User className="mr-2 h-4 w-4" /> 로그인
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 데스크톱 사이드바 */}
   <aside className="hidden lg:block w-64 bg-white sticky top-0 h-screen">
  <SidebarContent />
</aside>

      {/* 모바일 사이드바 */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-3 left-3 z-50 lg:hidden h-10 w-10 border bg-white shadow-md"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 overflow-auto h-100vh bg-white ml-[20px] border-l">
        <div className="p-4 lg:p-6 pt-16 lg:pt-6 h-full">
          {activeTab === "overview" && (
            <div className=" flex flex-col gap-[16px] h-full ">
        
     <div className={cn("w-full",isAuthenticated&&" mb-[50px]")}>
      <NewsTicker articles={news} sectorNames={sectorNames} isAuthenticated={isAuthenticated} isLoading={isOverviewLoading}/>
     </div>

     {isAuthenticated&& <Card className="border-none w-full flex flex-col gap-[8px]">
                          <CardTitle className=" text-lg lg:text-xl font-bold mb-1 flex flex-row items-center gap-[20px]">
                            <span>이번 달 가장 많이 오른 섹터</span>
                            <ChevronRight className="text-black cursor-pointer" />
                          </CardTitle>
              
                    <CardContent className="">
                          <div className="w-full h-full">
                          {/* <SectorPerformanceChart sectors={monthylSectors}/> */}
                          <StockLineChart/>
                      </div>
                    </CardContent>
                  </Card>}
                
   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  {/* 오늘의 급등종목 */}
  <Card className="">
    
    <CardHeader className="pb-3 lg:pb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <CardTitle className=" text-lg lg:text-xl font-bold mb-1 flex flex-row items-center gap-[20px]">
                            <span>오늘의 급등 종목 TOP 20</span>
                            <ChevronRight className="text-black cursor-pointer" />
                          </CardTitle>
       
      </div>
    </CardHeader>
    <CardContent>
      <TopStocksTable />
    </CardContent>
  </Card>

  {/* 시가총액 상위 50 */}
  <Card>
    <CardHeader className="pb-3 lg:pb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
           <CardTitle className=" text-lg lg:text-xl font-bold mb-1 flex flex-row items-center gap-[20px]">
                            <span>시가총액 TOP 50</span>
                            <ChevronRight className="text-black cursor-pointer" />
                          </CardTitle>
      
      </div>
    </CardHeader>
    <CardContent>
      <TopStocksTable />
    </CardContent>
  </Card>

  {/* 기관매수 상위 20 */}
  <Card>
    <CardHeader className="pb-3 lg:pb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
       <CardTitle className=" text-lg lg:text-xl font-bold mb-1 flex flex-row items-center gap-[20px]">
                            <span>기관매수 TOP 20</span>
                            <ChevronRight className="text-black cursor-pointer" />
                          </CardTitle>
       
      </div>
    </CardHeader>
    <CardContent>
      <TopStocksTable />
    </CardContent>
  </Card>

  {/* 외국인 매수 상위 20 */}
  <Card>
    <CardHeader className="pb-3 lg:pb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
         <CardTitle className=" text-lg lg:text-xl font-bold mb-1 flex flex-row items-center gap-[20px]">
                            <span>외국인 매수 TOP 20</span>
                            <ChevronRight className="text-black cursor-pointer" />
                          </CardTitle>
        
      </div>
    </CardHeader>
    <CardContent>
      <TopStocksTable />
    </CardContent>
  </Card>

  {/* 오늘의 거래대금 상위 20 */}
  <Card>
    <CardHeader className="pb-3 lg:pb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <CardTitle className=" text-lg lg:text-xl font-bold mb-1 flex flex-row items-center gap-[20px]">
                            <span>오늘의 거래대금 TOP 20</span>
                            <ChevronRight className="text-black cursor-pointer" />
                          </CardTitle>
        
        
      </div>
    </CardHeader>
    <CardContent>
      <TopStocksTable />
    </CardContent>
  </Card>
</div>

             
            

      
          
            </div>
          )}


          {activeTab === "sectors" && (
            <div className="space-y-5 lg:space-y-6">

            

              {/* 커스텀 섹터 관리 */}
              <CustomSectorManager customSectors={customSectors} setCustomSectors={setCustomSectors}  />
           

              </div>
          )}

          {activeTab === "analysis" && (
            <div className="w-full">
          

              {/* 데이터 생성 섹션 */}
          <DataControlPanel/>

            </div>
          )}
          {activeTab === "market-cap" && (
            <MarketCapPage/>
          )}
           {activeTab === "gainer" && (
            <GainerPage/>
          )}
              {activeTab === "trade-amount" && (
            <TopTradeAmountPage/>
          )}
        </div>
      </main>

      {/* 모달 */}
      <CreateSectorModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateSector={handleCreateSector}
      />
    </div>
  )
}
