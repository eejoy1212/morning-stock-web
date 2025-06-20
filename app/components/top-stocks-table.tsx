"use client"

import { ArrowUp, ArrowDown } from "lucide-react"

// 상위 종목 데이터
const topStocks = [
  { name: "삼성전자", ticker: "005930", price: 82600, change: 3.42, isUp: true },
  { name: "SK하이닉스", ticker: "000660", price: 137200, change: 2.87, isUp: true },
  { name: "네이버", ticker: "035420", price: 229000, change: 2.65, isUp: true },
  { name: "카카오", ticker: "035720", price: 53700, change: 2.31, isUp: true },
  { name: "LG화학", ticker: "051910", price: 525000, change: 1.98, isUp: true },
]

export function TopStocksTable() {
  return (
    <div className="space-y-3">
      {topStocks.map((stock, index) => (
        <div
          key={stock.ticker}
          className="flex items-center justify-between border-b bg-white p-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
              {index + 1}
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{stock.name}</p>
              <p className="text-xs text-gray-500">{stock.ticker}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900 text-sm">{stock.price.toLocaleString()}원</p>
            <div className="flex items-center justify-end gap-1">
              {stock.isUp ? (
                <ArrowUp className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500" />
              )}
              <span className={`text-xs font-medium ${stock.isUp ? "text-green-600" : "text-red-600"}`}>
                {stock.isUp ? "+" : ""}
                {stock.change}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
