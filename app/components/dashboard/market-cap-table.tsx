import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

type MarketCapRow = {
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

const columns: ColumnDef<MarketCapRow>[] = [
  { header: '순위', accessorKey: 'rank' },
  { header: '종목명', accessorKey: 'name' },
  { header: '시장구분', accessorKey: 'market' },
  { header: '종가', accessorKey: 'closePrice' },
  { header: '대비', accessorKey: 'diffPrice' },
  { header: '등락률', accessorKey: 'diffRate' },
  { header: '거래량', accessorKey: 'volume' },
  { header: '거래대금', accessorKey: 'tradeAmount' },
  { header: '시가총액', accessorKey: 'marketCap' },
  { header: '시가총액 비중', accessorKey: 'marketCapRatio' },
  { header: '상장주식수', accessorKey: 'sharesOutstanding' },
];

interface Props {
  data: MarketCapRow[];
}

export default function MarketCapTable({ data }: Props) {
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
                <td key={cell.id} className="px-4 py-2 border-b whitespace-nowrap">
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
