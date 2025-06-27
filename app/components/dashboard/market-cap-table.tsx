import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

export interface MarketCapRow  {
  rank: number;
  name: string;
  market: string;
  closePrice: number;
  diffPrice: number;
  diffRate: number;
  volume: number;
  tradeAmount: string;
  marketCap: string;
  marketCapRatio: number;
  sharesOutstanding: string;
};


interface Props {
  data: MarketCapRow[];
  columns: ColumnDef<MarketCapRow>[]
}

export default function MarketCapTable({ data,columns }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-md">
      <table className="min-w-full text-sm text-left table-auto">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 font-semibold text-gray-700 border-b"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 border-b whitespace-nowrap text-start">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
