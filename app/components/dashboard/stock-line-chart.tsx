"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts"
import { ArrowDown, ArrowUp } from "lucide-react"

const data = [
  { date: "03/19", price: 61000 },
  { date: "03/22", price: 62000, signal: "down" },
  { date: "03/25", price: 61500 },
  { date: "04/01", price: 58000 },
  { date: "04/10", price: 54000 },
  { date: "04/20", price: 54500 },
  { date: "05/01", price: 55000 },
  { date: "05/10", price: 57000 },
  { date: "06/01", price: 60000, signal: "up" },
  { date: "06/10", price: 58000 },
  { date: "06/15", price: 60500 },
]

export default function StockLineChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, bottom: 20, left: 30 }}>
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} tickFormatter={(v) => `${v.toLocaleString()}원`} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={(v: any) => `${v.toLocaleString()}원`} />

          <Area type="monotone" dataKey="price" stroke="#22c55e" fill="url(#greenGradient)" />

          {data.map((d, idx) =>
            d.signal === "up" ? (
              <ReferenceDot
                key={idx}
                x={d.date}
                y={d.price}
                r={8}
                isFront
                fill="#ef4444"
                label={{ position: "top", content: () => <ArrowUp size={12} color="#ef4444" /> }}
              />
            ) : d.signal === "down" ? (
              <ReferenceDot
                key={idx}
                x={d.date}
                y={d.price}
                r={8}
                isFront
                fill="#3b82f6"
                label={{ position: "top", content: () => <ArrowDown size={12} color="#3b82f6" /> }}
              />
            ) : null
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
