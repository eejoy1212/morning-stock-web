"use client"

import { useState } from "react"
import { CirclePlus, Edit, Save, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sector } from "@/domain/sector/api"

// 사용 가능한 주식 데이터
const availableStocks = [
  { name: "삼성전자", ticker: "005930", sector: "기술" },
  { name: "SK하이닉스", ticker: "000660", sector: "반도체" },
  { name: "네이버", ticker: "035420", sector: "기술" },
  { name: "카카오", ticker: "035720", sector: "기술" },
  { name: "LG화학", ticker: "051910", sector: "화학" },
  { name: "현대차", ticker: "005380", sector: "자동차" },
  { name: "셀트리온", ticker: "068270", sector: "바이오" },
  { name: "삼성바이오로직스", ticker: "207940", sector: "바이오" },
  { name: "KB금융", ticker: "105560", sector: "금융" },
  { name: "신한지주", ticker: "055550", sector: "금융" },
]

// 관심 섹터 초기 데이터
// const initialCustomSectors = [
//   {
//     name: "내 기술주 선택",
//     stocks: ["005930", "000660", "035420", "035720"],
//   },
//   {
//     name: "은퇴 자금",
//     stocks: ["105560", "055550", "051910"],
//   },
// ]

export function CustomSectorManager() {
  const [customSectors, setCustomSectors] = useState<Sector[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newSectorName, setNewSectorName] = useState("")
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
  const [editingSector, setEditingSector] = useState<number | null>(null)

  const handleCreateSector = () => {
    if (newSectorName.trim() === "") return

    // setCustomSectors([...customSectors, { name: newSectorName, stocks: selectedStocks }])
    setNewSectorName("")
    setSelectedStocks([])
    setIsCreating(false)
  }

  const handleEditSector = (index: number) => {
    if (editingSector === index) {
      setEditingSector(null)
    } else {
      setEditingSector(index)
      setSelectedStocks(customSectors[index].stocks)
    }
  }

  const handleUpdateSector = (index: number) => {
    const updatedSectors = [...customSectors]
    updatedSectors[index].stocks = selectedStocks
    setCustomSectors(updatedSectors)
    setEditingSector(null)
  }

  const handleDeleteSector = (index: number) => {
    const updatedSectors = customSectors.filter((_, i) => i !== index)
    setCustomSectors(updatedSectors)
  }

  const handleStockSelection = (ticker: string) => {
    if (selectedStocks.includes(ticker)) {
      setSelectedStocks(selectedStocks.filter((stock) => stock !== ticker))
    } else {
      setSelectedStocks([...selectedStocks, ticker])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">내 관심 섹터</h2>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>
            <CirclePlus className="mr-2 h-4 w-4" />새 섹터 만들기
          </Button>
        )}
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>새 관심 섹터 만들기</CardTitle>
            <CardDescription>관심 있는 주식을 그룹으로 묶어보세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sector-name">섹터 이름</Label>
              <Input
                id="sector-name"
                placeholder="관심 섹터 이름을 입력하세요"
                value={newSectorName}
                onChange={(e) => setNewSectorName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>주식 선택</Label>
              <div className="grid gap-2 md:grid-cols-2">
                {availableStocks.map((stock) => (
                  <div
                    key={stock.ticker}
                    className={`flex items-center justify-between rounded-md border p-3 ${
                      selectedStocks.includes(stock.ticker) ? "border-primary bg-primary/10" : ""
                    }`}
                    onClick={() => handleStockSelection(stock.ticker)}
                  >
                    <div>
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {stock.ticker} • {stock.sector}
                      </div>
                    </div>
                    <div className="h-4 w-4 rounded-sm border flex items-center justify-center">
                      {selectedStocks.includes(stock.ticker) && <div className="h-2 w-2 rounded-sm bg-primary"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              취소
            </Button>
            <Button onClick={handleCreateSector}>섹터 만들기</Button>
          </CardFooter>
        </Card>
      )}

      {customSectors.map((sector, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl font-medium">{sector.name}</CardTitle>
              <CardDescription>{sector.stocks.length}개 종목</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={() => handleEditSector(index)}>
                {editingSector === index ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleDeleteSector(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {editingSector === index ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>주식 선택</Label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {availableStocks.map((stock) => (
                      <div
                        key={stock.ticker}
                        className={`flex items-center justify-between rounded-md border p-3 ${
                          selectedStocks.includes(stock.ticker) ? "border-primary bg-primary/10" : ""
                        }`}
                        onClick={() => handleStockSelection(stock.ticker)}
                      >
                        <div>
                          <div className="font-medium">{stock.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {stock.ticker} • {stock.sector}
                          </div>
                        </div>
                        <div className="h-4 w-4 rounded-sm border flex items-center justify-center">
                          {selectedStocks.includes(stock.ticker) && (
                            <div className="h-2 w-2 rounded-sm bg-primary"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button onClick={() => handleUpdateSector(index)}>
                  <Save className="mr-2 h-4 w-4" />
                  변경사항 저장
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>종목명</TableHead>
                    <TableHead>종목코드</TableHead>
                    <TableHead>섹터</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sector.stocks.map((ticker) => {
                    const stock = availableStocks.find((s) => s.ticker === ticker)
                    if (!stock) return null

                    return (
                      <TableRow key={ticker}>
                        <TableCell className="font-medium">{stock.name}</TableCell>
                        <TableCell>{stock.ticker}</TableCell>
                        <TableCell>{stock.sector}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
