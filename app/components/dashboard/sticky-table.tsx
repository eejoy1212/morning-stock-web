// components/StickyTable.tsx
"use client"

import React from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table"




interface StickyTableProps {
  defaultColumns: ColumnDef<any, any>[]
  defaultData: any[]
}

export default function StickyTable({ defaultColumns ,defaultData}: StickyTableProps) {
  const table = useReactTable({
    data: defaultData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-auto">
      <table className="table-auto min-w-[600px] w-full border-collapse border" >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header, idx) => (
                <th
                  key={header.id}
                  className={`px-4 py-2 text-left border-b font-bold text-sm whitespace-nowrap
                    ${idx === 0 ? "sticky left-0 bg-gray-100 z-10 shadow-md" : ""}
                  `}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell, idx) => (
                <td
                  key={cell.id}
                  className={`px-4 py-2 text-sm border-b whitespace-nowrap
                    ${idx === 0 ? "sticky left-0 bg-gray-100 z-10 shadow-md font-medium" : ""}
                  `}
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
