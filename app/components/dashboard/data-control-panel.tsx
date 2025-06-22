"use client"

import React, { useState, useMemo, useEffect } from "react"

import { Zap, Download } from "lucide-react"
import { Card, CardContent, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Input } from "../ui/input"
import { fetchSectorsNameOnly } from "@/app/domain/sector/api"
import { useDebounce } from "use-debounce"
import CustomDataTable, { DailyRow, Group } from "./custom-data-table"
import { SectorPriceData } from "@/app/domain/daily-price/api"
import { ColumnDef } from "@tanstack/react-table"
import { fetchMultiItemChartData } from "@/app/domain/kis/api"


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
  export interface StockTableRow {
  date: string
  stocks: {
    [sectorName: string]: {
      [stockName: string]: number
    }
  }
}
export function DataControlPanel() {


  // const [selectedSector, setSelectedSector] = useState<Sector | null>(null)
  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([])
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
  const [sectorQuery, setSectorQuery] = useState("")
  const [stockQuery, setStockQuery] = useState("")
  const [generated, setGenerated] = useState(false)
  const [startDate, setStartDate] = useState("2025-06-01")
  const [endDate, setEndDate] = useState("2025-06-19")


const [fetchedSectors, setFetchedSectors] = useState<Sector[]>([])
const [sectorPage] = useState(1)
const [sectorLimit] = useState(10)
  const [generatedData, setGeneratedData] = useState<SectorPriceData[]>([])
const [data,setData]=useState<StockTableRow[]>([])

// const data: StockTableRow[] = [
//   {
//     date: "2025-06-13",
//     stocks: {
//       "엔터주": {
//         "삼성에스디에스": 137200,
//         "HL만도": 33100,
//         "DSR제강": 3700,
//       },
//       "테스트3주": {
//         "잇츠한불": 13000,
//       },
//       "전자주": {
//         "삼성전자": 58300,
//         "더우전자": 4770,
//         "아비코전자": 5320,
//         "LG전자": 72200,
//         "신일전자": 1493,
//       },
//       "로봇주": {
//         "HD한국조선해양": 350500,
//         "삼성공조": 14800,
//         "카카오페이": 60400,
//       },
//       "삼성주": {
//         "삼성제약": 1899,
//         "삼성물산": 165900,
//       },
//     },
//   },
//   {
//     date: "2025-06-14",
//     stocks: {
//       "엔터주": {
//         "삼성에스디에스": 137200,
//         "HL만도": 33100,
//         "DSR제강": 3700,
//       },
//       "테스트3주": {
//         "잇츠한불": 13000,
//       },
//       "전자주": {
//         "삼성전자": 58300,
//         "더우전자": 4770,
//         "아비코전자": 5320,
//         "LG전자": 72200,
//         "신일전자": 1493,
//       },
//       "로봇주": {
//         "HD한국조선해양": 350500,
//         "삼성공조": 14800,
//         "카카오페이": 60400,
//       },
//       "삼성주": {
//         "삼성제약": 1899,
//         "삼성물산": 165900,
//       },
//     },
//   },
//   {
//     date: "2025-06-15",
//     stocks: {
//       "엔터주": {
//         "삼성에스디에스": 137200,
//         "HL만도": 33100,
//         "DSR제강": 3700,
//       },
//       "테스트3주": {
//         "잇츠한불": 13000,
//       },
//       "전자주": {
//         "삼성전자": 58300,
//         "더우전자": 4770,
//         "아비코전자": 5320,
//         "LG전자": 72200,
//         "신일전자": 1493,
//       },
//       "로봇주": {
//         "HD한국조선해양": 350500,
//         "삼성공조": 14800,
//         "카카오페이": 60400,
//       },
//       "삼성주": {
//         "삼성제약": 1899,
//         "삼성물산": 165900,
//       },
//     },
//   },
// ]

const columns: ColumnDef<StockTableRow>[] = [
  {
    accessorKey: "date",
    header: "날짜",
  },
  // data가 비어있지 않을 경우에만 섹터/종목 컬럼 추가
  ...(data.length > 0
    ? Object.entries(data[0].stocks).map(([sectorName, stocks]) => ({
        // header: `${sectorName} (월평균율: 127.0%)`,
        header: `${sectorName}`,
        columns: Object.keys(stocks).map((stockName) => ({
          header: stockName,
          accessorFn: (row: StockTableRow) =>
            row.stocks?.[sectorName]?.[stockName] ?? "-",
          cell: (info: any) => {
            const value = info.getValue();
            return typeof value === "number" ? value.toLocaleString() : value;
          },
        })),
      }))
    : []),
];

 function transformSectorDataToTableFormat(
  sectorData: SectorPriceData[]
): { groups: Group[]; dates: string[]; rows: DailyRow[] } {
  const dateSet = new Set<string>()
  const stockToGroup: { [stock: string]: string } = {}
  const allPrices: Map<string, { [stock: string]: number }> = new Map()

  for (const sector of sectorData) {
    for (const stock of sector.stocks) {
      const dateKey = stock.date.slice(0, 10) // 'YYYY-MM-DD'
      dateSet.add(dateKey)

      stockToGroup[stock.name] = sector.sectorName

      if (!allPrices.has(dateKey)) allPrices.set(dateKey, {})
      allPrices.get(dateKey)![stock.name] = stock.close
    }
  }

  const dates = Array.from(dateSet).sort()
  const allStockNames = Object.keys(stockToGroup)

  // 그룹 생성
  const groupMap: { [groupName: string]: string[] } = {}
  for (const stock of allStockNames) {
    const group = stockToGroup[stock]
    if (!groupMap[group]) groupMap[group] = []
    if (!groupMap[group].includes(stock)) {
      groupMap[group].push(stock)
    }
  }

  const groups: Group[] = Object.entries(groupMap).map(([name, stocks]) => ({
    name,
    stocks,
  }))

  const rows: DailyRow[] = dates.map(date => ({
    date,
    prices: allStockNames.reduce((acc, stock) => {
      acc[stock] = allPrices.get(date)?.[stock] ?? "-"
      return acc
    }, {} as { [stock: string]: number | string })
  }))

  return {
    groups,
    dates,
    rows,
  }
}

const { groups, dates, rows } = transformSectorDataToTableFormat(generatedData)
console.log("테이블 데이터:", { groups, dates, rows })
useEffect(() => {
  const fetch = async () => {
    try {
      console.log("섹터 검색어:", sectorQuery)
      // if (!sectorQuery) {
      //   setFetchedSectors([]) // 검색어가 없으면 초기화
      //   return
        
      // }
      const res = await fetchSectorsNameOnly(sectorQuery)
      console.log("섹터 응답:", res)
      setFetchedSectors(res.sectors) // or res.data, 응답 구조에 따라 조정
    } catch (err) {
      console.error("섹터 불러오기 실패:", err)
      setFetchedSectors([])
    }
  }

  fetch()
}, [sectorQuery])
const toggleSector = (sector: Sector) => {
  setSelectedSectors((prev) => {
    const exists = prev.find((s) => s.id === sector.id)
    if (exists) {
      return prev.filter((s) => s.id !== sector.id)
    } else {
      return [...prev, sector]
    }
  })
}


  const toggleStock = (code: string) => {
    setSelectedStocks((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    )
  }
const handleGenerate=async()=>{
  try {
    setGenerated(true)

const tickers = selectedSectors.reduce((acc, sector) => {
  acc[sector.name] = sector.stocks.map((stock) => ({
    name: stock.name,
    code: stock.code,
  }));
  return acc;
}, {} as Record<string, { name: string; code: string }[]>);


const requestData = {
  tickers: tickers,
  startDate: startDate,
  endDate: endDate,
};
console.log(">>>requestData:", requestData)
const res=await fetchMultiItemChartData(requestData)
console.log("생성된 데이터:", res)
setData(res)
  } catch (error) {
    
  }


}
  return (
    <div>

      <Card className="border-none gap-[8px] flex flex-col">
      <div className="flex flex-row justify-start gap-[20px] items-center">
      <CardTitle  className=" text-lg lg:text-xl font-bold flex flex-row items-center gap-[20px]">
        
        데이터 생성 및 다운로드</CardTitle>
           <Button
            onClick={handleGenerate}
            disabled={selectedSectors.length===0 || !startDate || !endDate}
            className="text-sm lg:text-base font-semibold h-9 lg:h-10"
          >
            데이터 생성
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
  {/* 전체 선택 체크박스 */}
  <CommandItem
    value="select-all"
    onSelect={() => {
      const allSelected = fetchedSectors.every((s) =>
        selectedSectors.some((sel) => sel.id === s.id)
      )
      if (allSelected) {
        // 전체 해제
        setSelectedSectors((prev) =>
          prev.filter((sel) => !fetchedSectors.some((s) => s.id === sel.id))
        )
      } else {
        // 전체 선택
        const newSectors = fetchedSectors.filter(
          (s) => !selectedSectors.some((sel) => sel.id === s.id)
        )
        setSelectedSectors((prev) => [...prev, ...newSectors])
      }
    }}
    className="cursor-pointer px-3 py-2 text-sm font-medium bg-gray-50"
  >
    <input
      type="checkbox"
      checked={
        fetchedSectors.length > 0 &&
        fetchedSectors.every((s) =>
          selectedSectors.some((sel) => sel.id === s.id)
        )
      }
      readOnly
      className="mr-2"
    />
    전체 선택
  </CommandItem>

  {/* 개별 섹터 항목들 */}
  {fetchedSectors.map((sector) => {
    const selected = selectedSectors.some((s) => s.id === sector.id)
    return (
      <CommandItem
        key={sector.id}
        value={sector.name}
        onSelect={() => toggleSector(sector)}
        className={`cursor-pointer px-3 py-2 text-sm ${
          selected ? "bg-blue-100 font-medium" : ""
        }`}
      >
        <span>{sector.name}</span>
        {selected && <span className="ml-auto text-blue-600">✓</span>}
      </CommandItem>
    )
  })}
</CommandGroup>

</Command>
            </div>
          </div>

          {/* 종목 선택 */}
   
            {/* <div className="flex-1 space-y-3">
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
            </div> */}


          {/* 날짜 선택 */}
          <div className="flex-1 space-y-3">
            <h3 className="text-sm lg:text-base font-bold text-gray-900">2. 날짜 범위 선택</h3>
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
    <div className="w-full border-t my-[50px]"/>
                  {/* 생성된 데이터 테이블 */}
                  {/* {generatedData && <DataTable data={generatedData} />} */}
                  <CustomDataTable groups={groups} dates={dates} rows={rows} data={data} columns={columns}/>
    </div>
   
  )
}