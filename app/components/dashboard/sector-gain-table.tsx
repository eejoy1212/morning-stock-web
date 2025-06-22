// components/SectorGainTable.tsx
"use client"

import React from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table"
import { StockTableRow } from "./data-control-panel"


interface SectorGainTableProps {
  data?: StockTableRow[]
  columns?: ColumnDef<StockTableRow>[]
}
export default function SectorGainTable({data = [], columns = []}: SectorGainTableProps) {
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
              {headerGroup.headers.map((header,idx) => (
                <th
                  key={header.id+idx}
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
              {row.getVisibleCells().map((cell,cellIndex) => (
                <td
                     key={`${row.id}_${cell.column.id}_${cellIndex}`} 
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
