"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// 섹터 추세 데이터
const sectorData = {
  tech: [
    { date: "1월", value: 100 },
    { date: "2월", value: 120 },
    { date: "3월", value: 115 },
    { date: "4월", value: 130 },
    { date: "5월", value: 145 },
    { date: "6월", value: 160 },
  ],
  healthcare: [
    { date: "1월", value: 90 },
    { date: "2월", value: 85 },
    { date: "3월", value: 95 },
    { date: "4월", value: 105 },
    { date: "5월", value: 110 },
    { date: "6월", value: 115 },
  ],
  finance: [
    { date: "1월", value: 110 },
    { date: "2월", value: 105 },
    { date: "3월", value: 100 },
    { date: "4월", value: 115 },
    { date: "5월", value: 125 },
    { date: "6월", value: 130 },
  ],
  consumer: [
    { date: "1월", value: 95 },
    { date: "2월", value: 100 },
    { date: "3월", value: 105 },
    { date: "4월", value: 110 },
    { date: "5월", value: 115 },
    { date: "6월", value: 120 },
  ],
  energy: [
    { date: "1월", value: 105 },
    { date: "2월", value: 110 },
    { date: "3월", value: 100 },
    { date: "4월", value: 95 },
    { date: "5월", value: 105 },
    { date: "6월", value: 110 },
  ],
  entertainment: [
    { date: "1월", value: 115 },
    { date: "2월", value: 125 },
    { date: "3월", value: 120 },
    { date: "4월", value: 130 },
    { date: "5월", value: 140 },
    { date: "6월", value: 135 },
  ],
  semiconductor: [
    { date: "1월", value: 120 },
    { date: "2월", value: 130 },
    { date: "3월", value: 140 },
    { date: "4월", value: 135 },
    { date: "5월", value: 150 },
    { date: "6월", value: 165 },
  ],
  biotech: [
    { date: "1월", value: 85 },
    { date: "2월", value: 90 },
    { date: "3월", value: 100 },
    { date: "4월", value: 110 },
    { date: "5월", value: 105 },
    { date: "6월", value: 115 },
  ],
  telecom: [
    { date: "1월", value: 100 },
    { date: "2월", value: 105 },
    { date: "3월", value: 110 },
    { date: "4월", value: 105 },
    { date: "5월", value: 115 },
    { date: "6월", value: 120 },
  ],
  realestate: [
    { date: "1월", value: 95 },
    { date: "2월", value: 90 },
    { date: "3월", value: 85 },
    { date: "4월", value: 90 },
    { date: "5월", value: 95 },
    { date: "6월", value: 100 },
  ],
  mytech: [
    { date: "1월", value: 110 },
    { date: "2월", value: 125 },
    { date: "3월", value: 120 },
    { date: "4월", value: 135 },
    { date: "5월", value: 150 },
    { date: "6월", value: 165 },
  ],
  retirement: [
    { date: "1월", value: 100 },
    { date: "2월", value: 105 },
    { date: "3월", value: 110 },
    { date: "4월", value: 115 },
    { date: "5월", value: 120 },
    { date: "6월", value: 125 },
  ],
}

interface SectorTrendChartProps {
  sectorId: string
}

export function SectorTrendChart({ sectorId }: SectorTrendChartProps) {
  // 섹터가 없으면 기본값으로 기술 섹터 사용
  const data = sectorData[sectorId as keyof typeof sectorData] || sectorData.tech

  return (
    <ChartContainer
      config={{
        value: {
          label: "가치",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} fontSize={14} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            fontSize={14}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="value" strokeWidth={3} activeDot={{ r: 8 }} stroke="var(--color-value)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
