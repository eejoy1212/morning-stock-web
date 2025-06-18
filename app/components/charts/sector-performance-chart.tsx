"use client"

import { MonthlyTopSector } from "@/app/domain/sector/api"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts"
import { ChartContainer, ChartTooltip } from "../ui/chart"




export function SectorPerformanceChart({ sectors }: { sectors: MonthlyTopSector[] }) {
    if (!sectors || sectors.length === 0) return null // ← 데이터 없을 때 아무것도 렌더링 안함
  const sectorPerformanceData = sectors.map(s => ({ name: s.sectorName, value: s.rate }))

  // 수익률 최대값 기준으로 정규화된 비율 계산
  const maxRate = Math.max(...sectorPerformanceData.map(d => d.value))

  // 색상 계산 함수: value가 클수록 어두운 블루로, 작을수록 연한 블루로
const getBarColor = (value: number) => {
  const ratio = value / maxRate
  const lightness = 80 - ratio * 50 // 수익률 높을수록 진하게
  return `hsl(270, 83%, ${lightness}%)`
}

  return (
     <ChartContainer
      config={{
        performance: {
          label: "수익률",
          color: "hsl(var(--chart-1))",
        },
      }}
      className=" w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sectorPerformanceData}
          margin={{
            top: 30,
            right: 30,
            left: 30,
            bottom: 70,
          }}
          barCategoryGap="30%"
        >
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            fontWeight={600}
            angle={-45}
            textAnchor="end"
            height={70}
            interval={0}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            fontWeight={600}
            tickFormatter={(value) => `${value}%`}
            width={50}
          />
          <ChartTooltip
            cursor={{ fill: "rgba(37, 99, 235, 0.1)" }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-white p-3 shadow-lg">
                    <p className="font-bold text-base text-gray-900 mb-1">{label}</p>
                    <p className="text-base text-blue-600 font-semibold">
                      수익률: <span className="font-bold">{payload[0].value}%</span>
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
            {sectorPerformanceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
