"use client"

import React, { useState, useMemo } from "react"

import { Zap, Download } from "lucide-react"
import { Card, CardContent, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Input } from "../ui/input"


interface Sector {
  id: string
  name: string
  stocks: Stock[]
}

interface Stock {
  name: string
  code: string
  sectorId: string
}

export function DataControlPanel() {
  const mockSectors: Sector[] = [
    { id: "1", name: "엔터주", stocks: [] },
    { id: "2", name: "뷰티주", stocks: [] },
  ]
  const mockStocks: Stock[] = [
    { name: "하이브", code: "352820", sectorId: "1" },
    { name: "JYP Ent.", code: "035900", sectorId: "1" },
    { name: "아모레퍼시픽", code: "090430", sectorId: "2" },
  ]

  const [selectedSector, setSelectedSector] = useState<Sector | null>(null)
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
  const [sectorQuery, setSectorQuery] = useState("")
  const [stockQuery, setStockQuery] = useState("")
  const [generated, setGenerated] = useState(false)
  const [startDate, setStartDate] = useState("2025-06-01")
  const [endDate, setEndDate] = useState("2025-06-19")

  const filteredSectors = useMemo(
    () => mockSectors.filter((s) => s.name.toLowerCase().includes(sectorQuery.toLowerCase())),
    [sectorQuery]
  )

  const filteredStocks = useMemo(() => {
    if (!selectedSector) return []
    return mockStocks
      .filter((s) => s.sectorId === selectedSector.id)
      .filter((s) => s.name.toLowerCase().includes(stockQuery.toLowerCase()))
  }, [selectedSector, stockQuery])

  const toggleStock = (code: string) => {
    setSelectedStocks((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    )
  }

  return (
    <Card className="border-none gap-[8px] flex flex-col">
      <div className="flex flex-row justify-start gap-[20px] items-center">
      <CardTitle  className=" text-lg lg:text-xl font-bold flex flex-row items-center gap-[20px]">
        
        데이터 생성 및 다운로드</CardTitle>
           <Button
            onClick={() => setGenerated(true)}
            disabled={!selectedSector}
            className="text-sm lg:text-base font-semibold h-9 lg:h-10"
          >
            <Zap className="mr-2 h-4 w-4" />
            데이터 분석
          </Button>

      </div>


      <CardContent className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 섹터 선택 */}
          <div className="flex-1 space-y-3">
            <h3 className="text-sm lg:text-base font-bold text-gray-900">1. 섹터 선택</h3>
            <div className="rounded-md border bg-white shadow-sm">
              <Command>
                <CommandInput
                  placeholder="섹터명을 검색하세요"
                  value={sectorQuery}
                  onValueChange={setSectorQuery}
                />
                <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                <CommandGroup>
                  {filteredSectors.map((sector) => (
                    <CommandItem
                      key={sector.id}
                      onSelect={() => {
                        setSelectedSector(sector)
                        setSectorQuery("")
                      }}
                      className={`cursor-pointer px-3 py-2 text-sm ${selectedSector?.id === sector.id ? "bg-blue-100 font-medium" : ""}`}
                    >
                      {sector.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </div>
          </div>

          {/* 종목 선택 */}
   
            <div className="flex-1 space-y-3">
              <h3 className="text-sm lg:text-base font-bold text-gray-900">2. 종목 선택</h3>
              <div className="rounded-md border bg-white shadow-sm">
                <Command>
                  <CommandInput
                    placeholder="종목명을 검색하세요"
                    value={stockQuery}
                    onValueChange={setStockQuery}
                  />
                  <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                  <CommandGroup>
                    {filteredStocks.map((stock) => (
                      <CommandItem
                        key={stock.code}
                        onSelect={() => toggleStock(stock.code)}
                        className={`cursor-pointer flex justify-between px-3 py-2 text-sm ${selectedStocks.includes(stock.code) ? "bg-green-100 font-semibold" : ""}`}
                      >
                        <span>
                          {stock.name} ({stock.code})
                        </span>
                        {selectedStocks.includes(stock.code) && <span className="text-green-600">✓</span>}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </div>
            </div>


          {/* 날짜 선택 */}
          <div className="flex-1 space-y-3">
            <h3 className="text-sm lg:text-base font-bold text-gray-900">3. 날짜 범위 선택</h3>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="mx-2">~</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        

        {/* 안내 문구 */}
        {/* {!selectedSector && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800 font-semibold">
              데이터를 생성하려면 섹터를 먼저 선택해주세요.
            </p>
          </div>
        )} */}
      </CardContent>
    </Card>
  )
}