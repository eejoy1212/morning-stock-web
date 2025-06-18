"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SectorPriceData } from "@/domain/daily-price/api"

interface DataTableProps {
  data: SectorPriceData[]
}

export function DataTable({ data }: DataTableProps) {
  return (
    <Card className="border shadow-md">
      <CardHeader className="pb-3 lg:pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <CardTitle className="text-lg lg:text-xl font-bold text-gray-900 mb-1">
             섹터 데이터 분석
            </CardTitle>
            <CardDescription className="text-sm lg:text-base text-gray-700">
              선택한 섹터의 종목별 데이터를 확인하세요 (단위: 원)
            </CardDescription>
          </div>
          <Badge className="text-sm lg:text-base px-2 lg:px-3 py-1 font-semibold bg-purple-600 w-fit">분석 완료</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg border p-2 lg:p-3">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[600px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="w-[150px] font-bold text-sm lg:text-base text-gray-900 bg-gray-100 border-r h-10 lg:h-12">
                      종목명
                    </TableHead>
                    {(data&&data.length>0)&&data.map((date, index) => (
                      <TableHead
                        key={index}
                        className="text-center font-bold text-sm lg:text-base text-gray-900 bg-gray-100 border-r last:border-r-0 h-10 lg:h-12"
                      >
                        <div className="py-1.5">
                          <div className="font-bold">{date.label}</div>
                          <div className="text-xs lg:text-sm text-gray-600 font-normal">{date.date}</div>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(data&&data.length>0)&&data.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="border-b hover:bg-white h-10 lg:h-12">
                      <TableCell className="font-bold text-sm lg:text-base text-gray-900 bg-gray-50 border-r">
                        {row.company}
                      </TableCell>
                      {row.values.map((value, valueIndex) => (
                        <TableCell
                          key={valueIndex}
                          className="text-center text-sm lg:text-base font-semibold border-r last:border-r-0"
                        >
                          {value.toLocaleString()}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="mt-4 lg:mt-5 p-3 lg:p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm lg:text-base text-blue-800 font-semibold">
            * 표시된 데이터는 모의 데이터입니다. 실제 서비스에서는 실시간 주식 데이터가 표시됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
