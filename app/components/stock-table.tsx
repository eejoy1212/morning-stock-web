"use client"

import { ArrowUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

// 급등 종목 데이터
const topStocks = [
  { name: "삼성전자", ticker: "005930", price: 82600, change: 3.42 },
  { name: "SK하이닉스", ticker: "000660", price: 137200, change: 2.87 },
  { name: "네이버", ticker: "035420", price: 229000, change: 2.65 },
  { name: "카카오", ticker: "035720", price: 53700, change: 2.31 },
  { name: "LG화학", ticker: "051910", price: 525000, change: 1.98 },
]

export function StockTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">종목명</TableHead>
          <TableHead>가격</TableHead>
          <TableHead className="text-right">변동</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topStocks.map((stock) => (
          <TableRow key={stock.ticker}>
            <TableCell className="font-medium">
              <div>{stock.name}</div>
              <div className="text-xs text-muted-foreground">{stock.ticker}</div>
            </TableCell>
            <TableCell>{stock.price.toLocaleString()}원</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">+{stock.change}%</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
