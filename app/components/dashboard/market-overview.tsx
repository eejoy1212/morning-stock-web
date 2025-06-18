"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Activity, Users } from "lucide-react"

const marketData = [
  {
    name: "코스피",
    value: "2,847.65",
    change: "+1.2%",
    changeValue: "+34.12",
    isUp: true,
    icon: TrendingUp,
  },
  {
    name: "코스닥",
    value: "891.23",
    change: "+0.8%",
    changeValue: "+7.12",
    isUp: true,
    icon: TrendingUp,
  },
  {
    name: "거래량",
    value: "4.2억",
    change: "평균 대비",
    changeValue: "+15%",
    isUp: true,
    icon: Activity,
  },
  {
    name: "외국인 순매수",
    value: "1,247억",
    change: "매수 우위",
    changeValue: "3일 연속",
    isUp: true,
    icon: Users,
  },
]

export function MarketOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {marketData.map((item, index) => (
        <Card key={index} className="border shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between mb-2 lg:mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${item.isUp ? "bg-green-100" : "bg-red-100"}`}>
                  <item.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${item.isUp ? "text-green-600" : "text-red-600"}`} />
                </div>
                <div>
                  <p className="text-sm lg:text-base font-bold text-gray-700">{item.name}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{item.value}</p>
              <div className="flex items-center justify-between">
                <Badge
                  className={`text-xs lg:text-sm px-1.5 lg:px-2 py-0.5 font-semibold ${item.isUp ? "bg-green-600" : "bg-red-600"}`}
                >
                  {item.change}
                </Badge>
                <p className="text-xs lg:text-sm text-gray-600 font-medium">{item.changeValue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
