// components/SectorGainTable.tsx
"use client"

import React from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table"

interface StockTableRow {
  date: string
  stocks: {
    [sectorName: string]: {
      [stockName: string]: number
    }
  }
}

const data: StockTableRow[] = [
  {
    date: "2025-06-13",
    stocks: {
      "엔터주": {
        "삼성에스디에스": 137200,
        "HL만도": 33100,
        "DSR제강": 3700,
      },
      "테스트3주": {
        "잇츠한불": 13000,
      },
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
      "삼성주": {
        "삼성제약": 1899,
        "삼성물산": 165900,
      },
    },
  },
]

const columns: ColumnDef<StockTableRow>[] = [
  {
    accessorKey: "date",
    header: "날짜",
  },
  ...Object.entries(data[0].stocks).map(([sectorName, stocks]) => ({
    header: `${sectorName} (월평균율: 127.0%)`,
    columns: Object.keys(stocks).map((stockName) => ({
      header: stockName,
      accessorFn: (row: StockTableRow) => row.stocks?.[sectorName]?.[stockName] ?? "-",
      cell: (info: any) => Number(info.getValue()).toLocaleString(),
    })),
  })),
]

export default function SectorGainTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-auto">
      <table className="min-w-full table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-50">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border px-3 py-2 text-sm font-semibold text-center whitespace-nowrap"
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border px-3 py-2 text-sm text-right whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
