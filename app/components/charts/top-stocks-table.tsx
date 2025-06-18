"use client"

import { ArrowUp } from "lucide-react"

const topStocks = [
  { name: "삼성전자", ticker: "005930", price: 82600, change: 3.42, isUp: true },
  { name: "SK하이닉스", ticker: "000660", price: 137200, change: 2.87, isUp: true },
  { name: "네이버", ticker: "035420", price: 229000, change: 2.65, isUp: true },
  { name: "카카오", ticker: "035720", price: 53700, change: 2.31, isUp: true },
  { name: "LG화학", ticker: "051910", price: 525000, change: 1.98, isUp: true },
]

export function TopStocksTable() {
  return (
    <div className="">
      {topStocks.map((stock, index) => (
        <div
          key={stock.ticker}
          className="flex items-center justify-between  border-b bg-white p-2.5 lg:p-3 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="flex h-7 w-7 lg:h-9 lg:w-9 items-center justify-center rounded-[8px] bg-blue-100 text-xs lg:text-sm font-bold text-blue-700 border border-blue-200">
              {index + 1}
            </div>
            <div>
              <p className="font-bold text-sm lg:text-base text-gray-900">{stock.name}</p>
              <p className="text-xs lg:text-sm text-gray-600 font-medium">{stock.ticker}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-sm lg:text-base text-gray-900 mb-0.5 lg:mb-1">
              {stock.price.toLocaleString()}원
            </p>
            <div className="flex items-center justify-end gap-1 lg:gap-2">
              <ArrowUp className="h-3 w-3 lg:h-4 lg:w-4 text-green-600" />
              <span className="text-xs lg:text-sm font-bold text-green-600">+{stock.change}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
