"use client"


import { useEffect, useState } from "react"
import StickyTable from "./sticky-table"
import { ColumnDef } from "@tanstack/react-table"
import SectorGainTable from "./sector-gain-table"
import { Button } from "../ui/button"
import { Download } from "lucide-react"
import { Card, CardContent, CardTitle } from "../ui/card"
import { StockTableRow } from "./data-control-panel"
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
export interface DailyRow {
  date: string
  prices: { [stockName: string]: number | string }
}

export interface Group {
  name: string
  stocks: string[]
}

export interface CustomDataTableProps {
  dates: string[]            // 예: ["2025-06-12", "2025-06-13"]
  groups: Group[]            // 예: [{ name: "IT주", stocks: ["삼성전자", "현대차", "카카오"] }]
  rows: DailyRow[]           // 예: [{ date: "2025-06-13", prices: { "삼성전자": 70000, "현대차": 85000 } }]
data: StockTableRow[] // 예: [{ date: "2025-06-13", prices: { "삼성전자": 70000, "현대차": 85000 } }]
  columns: ColumnDef<StockTableRow>[] // 예: [{ header: "날짜",
}

export default function CustomDataTable({ dates, groups, rows ,data,columns}: CustomDataTableProps) {
  const [token,setToken]=useState<string>("")
  const flattenedStocks = groups.flatMap(group => group.stocks)
useEffect(()=>{
    const token=  localStorage.getItem("jwt_token")??""
    setToken(token)
},[])
function exportToExcelWithGroupedHeader(
  data: StockTableRow[],
  fileName = '일자별_종가_데이터.xlsx'
) {
  const sectorMap = new Map<string, string[]>(); // sector -> stock[]

  data.forEach((row) => {
    Object.entries(row.stocks).forEach(([sector, stocks]) => {
      if (!sectorMap.has(sector)) {
        sectorMap.set(sector, []);
      }
      const stockList = sectorMap.get(sector)!;
      Object.keys(stocks).forEach((stock) => {
        if (!stockList.includes(stock)) {
          stockList.push(stock);
        }
      });
    });
  });

  const sectors = Array.from(sectorMap.keys());

  // 헤더 구성
  const sectorHeader = ['날짜'];
  const stockHeader = [''];

  sectors.forEach((sector) => {
    const stocks = sectorMap.get(sector)!;
    sectorHeader.push(...Array(stocks.length).fill(sector));
    stockHeader.push(...stocks);
  });

  const rows = data.map((row) => {
    const rowArray: any[] = [row.date];
    sectors.forEach((sector) => {
      const stocks = sectorMap.get(sector)!;
      stocks.forEach((stock) => {
        const value = row.stocks?.[sector]?.[stock];
        rowArray.push(value ?? '');
      });
    });
    return rowArray;
  });

  const sheetData = [sectorHeader, stockHeader, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

  // 병합 정보 추가: 섹터 단위로 병합
  const merges: XLSX.Range[] = [];
  let col = 1;
  sectors.forEach((sector) => {
    const stocks = sectorMap.get(sector)!;
    if (stocks.length > 1) {
      merges.push({
        s: { r: 0, c: col },
        e: { r: 0, c: col + stocks.length - 1 },
      });
    }
    col += stocks.length;
  });

  worksheet['!merges'] = merges;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '일자별 종가');

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
}
console.log("data : ",data)
  return (
    <Card className="border-none gap-[8px] flex flex-col">
      <div className="flex flex-row justify-start gap-[20px]">
           <CardTitle className=" text-lg lg:text-xl font-bold flex flex-row items-center gap-[20px]">
                            <span>일자별 종가 데이터</span>
                          </CardTitle>
                            <Button
              onClick={() => exportToExcelWithGroupedHeader(data, '일자별_종가_데이터.xlsx')}
              className="text-sm lg:text-base font-semibold h-9 lg:h-10 bg-green-600 hover:bg-green-700"
            >
              <Download className="mr-2 h-4 w-4" />
              엑셀 다운로드
            </Button>
      </div>
       
      <CardContent className="overflow-x-auto">
        <div className="w-full">
          {Array.isArray(data) && data.length > 0 ? (
            <SectorGainTable data={data} columns={columns} />
          ) : (
            <span className="w-full flex items-center justify-center mt-[16px]">데이터가 없습니다.</span>
          )}


        </div>
      </CardContent>
    </Card>
  )
}
