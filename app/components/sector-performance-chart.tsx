"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts"
import { ChartContainer, ChartTooltip } from "../components/ui/chart"

// 섹터 성과 데이터 (월간 수익률 %)
const sectorPerformanceData = [
  { name: "반도체", value: 18.5, color: "#3b82f6" },
  { name: "기술", value: 15.2, color: "#06b6d4" },
  { name: "바이오", value: 12.8, color: "#10b981" },
  { name: "엔터테인먼트", value: 11.4, color: "#8b5cf6" },
  { name: "에너지", value: 10.5, color: "#f59e0b" },
  { name: "헬스케어", value: 9.3, color: "#ef4444" },
  { name: "금융", value: 8.1, color: "#6b7280" },
  { name: "소비재", value: 6.7, color: "#ec4899" },
]

export function SectorPerformanceChart() {
  return (
    <ChartContainer
      config={{
        performance: {
          label: "수익률",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sectorPerformanceData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
          barCategoryGap="20%"
        >
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            fontWeight={500}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(value) => `${value}%`} width={50} />
          <ChartTooltip
            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-white p-3 shadow-lg">
                    <p className="font-medium text-gray-900">{label}</p>
                    <p className="text-sm text-blue-600">
                      수익률: <span className="font-semibold">{payload[0].value}%</span>
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
            {sectorPerformanceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
