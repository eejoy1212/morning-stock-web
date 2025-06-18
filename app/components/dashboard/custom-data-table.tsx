"use client"


import { useEffect, useState } from "react"
import StickyTable from "./sticky-table"
import { ColumnDef } from "@tanstack/react-table"
import SectorGainTable from "./sector-gain-table"
import { Button } from "../ui/button"
import { Download } from "lucide-react"
import { Card, CardContent, CardTitle } from "../ui/card"

export interface DailyRow {
  date: string
  prices: { [stockName: string]: number | string }
}

export interface Group {
  name: string
  stocks: string[]
}

export interface CustomDataTableProps {
  dates: string[]            // 예: ["2025-06-12", "2025-06-13"]
  groups: Group[]            // 예: [{ name: "IT주", stocks: ["삼성전자", "현대차", "카카오"] }]
  rows: DailyRow[]           // 예: [{ date: "2025-06-13", prices: { "삼성전자": 70000, "현대차": 85000 } }]
}

export default function CustomDataTable({ dates, groups, rows }: CustomDataTableProps) {
  const [token,setToken]=useState<string>("")
  const flattenedStocks = groups.flatMap(group => group.stocks)
useEffect(()=>{
    const token=  localStorage.getItem("jwt_token")??""
    setToken(token)
},[])
const data = [
  {
    date: "2025-06-13",
    stocks: {
      "테스트1주": { "삼양엔씨컴": 18880, "현대백화점": 70000, "문배철강": 2325 },
      "배터리주": { "삼성중공업": 17690 },
      "엔터주": { "삼성에스디에스": 137200, "HL만도": 33100, "DSR제강": 3700 },
      "테스트3주": { "잇츠한불": 13000 },
      "전자주": {
        "삼성전자": 58300,
        "더우전자": 4770,
        "아비코전자": 5320,
        "LG전자": 72200,
        "신일전자": 1493,
      },
      "로봇주": {
        "HD한국조선해양": 350500,
        "삼성공조": 14800,
        "카카오페이": 60400,
      },
      "삼성주": { "삼성제약": 1899, "삼성물산": 165900 },
    },
  },
]

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "date",
    header: "날짜",
  },
  {
    header: "엔터주 (월평균율: 127.0%)",
    columns: [
      { accessorFn: row => row.stocks["엔터주"]["삼성에스디에스"], header: "삼성에스디에스" },
      { accessorFn: row => row.stocks["엔터주"]["HL만도"], header: "HL만도" },
      { accessorFn: row => row.stocks["엔터주"]["DSR제강"], header: "DSR제강" },
    ],
  },
  {
    header: "테스트3주 (월평균율: 127.0%)",
    columns: [
      { accessorFn: row => row.stocks["테스트3주"]["잇츠한불"], header: "잇츠한불" },
    ],
  },
  {
    header: "전자주 (월평균율: 127.0%)",
    columns: [
      { accessorFn: row => row.stocks["전자주"]["삼성전자"], header: "삼성전자" },
      { accessorFn: row => row.stocks["전자주"]["더우전자"], header: "더우전자" },
      { accessorFn: row => row.stocks["전자주"]["아비코전자"], header: "아비코전자" },
      { accessorFn: row => row.stocks["전자주"]["LG전자"], header: "LG전자" },
      { accessorFn: row => row.stocks["전자주"]["신일전자"], header: "신일전자" },
    ],
  },
  {
    header: "로봇주 (월평균율: 127.0%)",
    columns: [
      { accessorFn: row => row.stocks["로봇주"]["HD한국조선해양"], header: "HD한국조선해양" },
      { accessorFn: row => row.stocks["로봇주"]["삼성공조"], header: "삼성공조" },
      { accessorFn: row => row.stocks["로봇주"]["카카오페이"], header: "카카오페이" },
    ],
  },
  {
    header: "삼성주 (월평균율: 127.0%)",
    columns: [
      { accessorFn: row => row.stocks["삼성주"]["삼성제약"], header: "삼성제약" },
      { accessorFn: row => row.stocks["삼성주"]["삼성물산"], header: "삼성물산" },
    ],
  },
]

  return (
    <Card className="border-none gap-[8px] flex flex-col">
      <div className="flex flex-row justify-start gap-[20px]">
           <CardTitle className=" text-lg lg:text-xl font-bold flex flex-row items-center gap-[20px]">
                            <span>일자별 종가 데이터</span>
                          </CardTitle>
                            <Button
              onClick={() => alert("엑셀 다운로드 실행")}
              className="text-sm lg:text-base font-semibold h-9 lg:h-10 bg-green-600 hover:bg-green-700"
            >
              <Download className="mr-2 h-4 w-4" />
              엑셀 다운로드
            </Button>
      </div>
       
      <CardContent className="overflow-x-auto">
        <div className="w-full">
         {/* {token? <Table>
            <thead>
              <tr>
                <th className="bg-gray-100 text-center font-bold border-r w-[120px]">날짜</th>
                {groups.map((group, index) => (
                  <th
                    key={index}
                    className="bg-yellow-100 text-center font-semibold border-r"
                    colSpan={group.stocks.length}
                  >
                    {group.name} (월평균율 : 127.0%)
                  </th>
                ))}
              </tr>
              <tr>
                <th className="bg-gray-100 text-center font-bold border-r">종목</th>
                {flattenedStocks.map((stock, index) => (
                  <th key={index} className="bg-gray-200 text-center font-semibold border-r">
                    {stock}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b hover:bg-white">
                  <td className="text-center font-bold bg-gray-50 border-r">{row.date}</td>
                  {flattenedStocks.map((stock, i) => (
                    <td key={i} className="text-center border-r">
                      {(row.prices[stock] ?? "-").toLocaleString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>:<span>로그인 해주세요.</span>} */}
          <SectorGainTable/>


        </div>
      </CardContent>
    </Card>
  )
}
