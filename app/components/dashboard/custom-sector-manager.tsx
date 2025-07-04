"use client"

import { useState } from "react"
import { Edit, Trash2, Building2, Plus } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/hooks/use-toast"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command"
import { useEffect } from "react"
import { useCallback } from "react"
// import debounce from "lodash.debounce"
// import { deleteSector, fetchSectors, Sector } from "@/domain/sector/api"
// import { addStockToSector, deleteStock } from "@/domain/stock/api"
import StickyTable from "./sticky-table"
import { ColumnDef } from "@tanstack/react-table"
import StockChip from "./stock-chip"
import { Pagination } from "./pagination"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
// import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import SectorDialog from "./sector-dialog"
import { deleteSector, fetchSectors, Sector } from "@/app/domain/sector/api"
import { addStockToSector, deleteStock } from "@/app/domain/stock/api"
import { Button } from "../ui/button"
import { Card, CardContent, CardTitle } from "../ui/card"
import { set } from "date-fns"
import { se } from "date-fns/locale"


interface CustomSector {
  id: string
  name: string
  companies: string[]
}

interface CustomSectorManagerProps {
  customSectors: Sector[]
  setCustomSectors: (sectors: Sector[]) => void

}

export function CustomSectorManager({ customSectors, setCustomSectors }: CustomSectorManagerProps) {
  const [selectedCompanies, setSelectedCompanies] = useState<{ [key: string]: string }>({})
  // const { toast } = useToast()
const [searchResults, setSearchResults] = useState<{ name: string; code: string }[]>([])
const [token,setToken]=useState("")
const [isCreating, setIsCreating] = useState(false)
const [totalCount, setTotalCount] = useState(0)
const [selectedStocks, setSelectedStocks] = useState<string[]>([])
const [editingSector, setEditingSector] = useState<Sector | null>(null)
const [searchQuery, setSearchQuery] = useState("")
const [searchTerm, setSearchTerm] = useState("")
useEffect(()=>{
  const res=    localStorage.getItem("jwt_token")??""
  setToken(res);
},[])

  const handleAddCompany = async(sectorId: string,companyToAdd:string,code:string) => {
    // const companyToAdd = selectedCompanies[sectorId]
    console.log(`sector id : ${sectorId}/ company : ${companyToAdd}`,)
    if (!companyToAdd) return
  const result = await addStockToSector({
      sectorId: sectorId,
      name: companyToAdd,
      code:code
    })
    if (result.success) {
        console.log("종목추가 완료",result)
    // const updatedSectors = customSectors.map((sector) => {
    //   if (sector.id === sectorId && !sector.companies.includes(companyToAdd)) {
    //     return { ...sector, companies: [...sector.companies, companyToAdd] }
    //   }
    //   return sector
    // })

    // setCustomSectors(updatedSectors)
    // localStorage.setItem("custom_sectors", JSON.stringify(updatedSectors))

  alert("종목 추가가 완료되었습니다.")
  setSelectedCompanies({})
// window.location.reload();

    }
  
  }

  const handleRemoveCompany = async(stockId: string) => {
  const res=await deleteStock(stockId)
  console.log(res)
  if (res.success) {
    alert("회사가 삭제되었습니다!")
  } else {
   alert("회사가 삭제에 실패했습니다!")
  }
  }

  const handleDeleteSector = async(sectorId: string) => {
    if (confirm("정말로 이 섹터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
    const res=await deleteSector(sectorId)
 if (res.success) {
  alert("섹터 삭제 성공!")
  fetchSectors(searchTerm, page, itemsPerPage).then((res) => {
    console.log("fetch sectors after delete", res)
    setData(res.sectors)
    setTotalCount(res.total)
    setPage(res.page)
  })
 } else {
  alert("섹터 삭제 실패!")
 } 
    }else {
  return
  }}


const defaultColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "섹터명",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "stockCount",
    header: "포함 종목 수",
    cell: (info) => `${info.getValue()}개`,
  },
  {
    accessorKey: "stocks",
    header: "종목 보기",
    cell: ({ row }) => {
      const stocks = row.original.stocks as { name: string; code: string }[]
      return (
        <div className="flex flex-wrap gap-1 max-w-[300px]">
          {stocks.map((stock) => (
            <StockChip key={stock.code} title={`${stock.name} (${stock.code})`}/>
          
          ))}
        </div>
      )
    },
  },

//    {
//   id: "stocks-add",
//   header: "종목 추가",
//   cell: ({ row }) => (
//     <Button>
//       종목 추가
//     </Button>
//   ),
// },
{
  id: "sector-edit",
  header: "섹터 수정",
  cell: ({ row }) => (
    <Button  variant={"outline"} className=" border-blue-600 text-blue-600" onClick={() => {
      setEditingSector(row.original)
      setIsCreating(true)
    }}>
      섹터 수정
    </Button>
  ),
},
{
  id: "sector-delete",
  header: "섹터 삭제",
  cell: ({ row }) => (
    <Button variant="destructive" className="" onClick={() => handleDeleteSector(row.original.id)}>
      섹터 삭제
    </Button>
  ),
},
]
const [page, setPage] = useState(1)
const itemsPerPage = 6
const [data,setData]=useState<Sector[]>([])

// const availableStocks = [
//   { name: "LG에너지솔루션", ticker: "373220", sector: "배터리" },
//   { name: "삼성SDI", ticker: "006400", sector: "배터리" },
//   { name: "NAVER", ticker: "035420", sector: "IT" },
//   // 필요시 추가
// ]
const getDatas=async()=>{
  const res=await fetchSectors(searchTerm, page, itemsPerPage)
  console.log("fetch sectors",res)
  setData(res.sectors);
  setTotalCount(res.total)
  setPage(res.page)
}
useEffect(() => {
getDatas()
},[page,editingSector,isCreating,searchTerm])

const customData=data.map(d=>{return {
  id: d.id,
  name:d.name,
  stockCount: d.stocks ? d.stocks.length : 0,
  stocks: d.stocks
}})
const handleSearch = ()=>{
  setSearchTerm(searchQuery)
  setPage(1)
  getDatas()
}
const handleInit=async()=>{
  setSearchQuery("")
  setSearchTerm("")
  setPage(1)
 await getDatas()
}
if(!token){
  return <Card className="border shadow-md bg-gray-50">
        <CardContent className="flex flex-col items-center justify-center py-12 lg:py-16">
          <p className="text-base lg:text-lg text-gray-700 text-center max-w-2xl px-4">
          로그인 해주세요
          </p>
        </CardContent>
      </Card>
}


  return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
//       {customSectors.map((sector, index) => (
//         <Card key={sector.id} className="border shadow-md">
//           <CardHeader className="pb-3 lg:pb-4">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
//               <div>
//                 <CardTitle className="text-lg lg:text-xl font-bold text-gray-900 mb-1">{sector.name}</CardTitle>
//                 <CardDescription className="text-sm lg:text-base text-gray-700">
//                   {sector.stocks?sector.stocks.length:0}개 종목 • 종목을 추가하여 섹터를 구성하세요
//                 </CardDescription>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="sm" className="border h-8 w-8">
//                   <Edit className="h-3.5 w-3.5" />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleDeleteSector(sector.id)}
//                   className="border h-8 w-8 hover:bg-red-50 hover:border-red-300"
//                 >
//                   <Trash2 className="h-3.5 w-3.5" />
//                 </Button>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-3 lg:space-y-4">
//             {/* 종목 추가 */}
//           <div className="bg-gray-50 p-3 lg:p-4 rounded-lg border">
//   <h4 className="text-sm lg:text-base font-bold text-gray-900 mb-2 lg:mb-3">새 종목 추가</h4>
//   <div className="flex flex-col gap-2">
//     <Command>
//       <CommandInput
//         placeholder="회사명 또는 종목코드 검색"
//         value={selectedCompanies[sector.id] || ""}
//      onValueChange={(value:string) => {
//   setSelectedCompanies((prev) => ({ ...prev, [sector.id]: value }))

//   fetchSearchResults(value)
// }}


//         className="h-9 lg:h-10 text-sm lg:text-base"
        
//       />
//       <CommandEmpty>검색 결과가 없습니다</CommandEmpty>
//       {(selectedCompanies[sector.id] || "").length > 0 && (
//                   <CommandGroup>
//   {searchResults
//     .filter(
//       (item) =>
//         !sector.stocks.map(s=>s.name).includes(item.name)
//     )
//     .map((item) => (
//       <CommandItem
//         key={item.code}
//         value={`${item.name} (${item.code})`}
//         onSelect={() => handleAddCompany(sector.id, item.name,item.code)}
//         className="cursor-pointer"
//       >
//         {item.name} ({item.code})
//       </CommandItem>
//     ))}
// </CommandGroup>

//                   )}
//     </Command>
//     {/* <Button
//       onClick={() => handleAddCompany(sector.id)}
//       disabled={!selectedCompanies[sector.id]}
//       size="default"
//       className="text-sm lg:text-base font-semibold h-9 lg:h-10"
//     >
//       추가
//     </Button> */}
//   </div>
// </div>

//             {/* 현재 종목 목록 */}
//            {sector.stocks && (
//   <div>
//     <h4 className="text-sm lg:text-base font-bold text-gray-900 mb-2 lg:mb-3">
//       포함된 종목 ({sector.stocks.length}개)
//     </h4>
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
//       {sector.stocks.map((company) => (
//         <Badge
//           key={company.name}
//           variant="secondary"
//           className="cursor-pointer hover:bg-red-100 hover:text-red-700 text-xs lg:text-sm px-2 lg:px-3 py-1.5 lg:py-2 font-semibold border justify-center"
//           onClick={() => handleRemoveCompany(company.id)}
//         >
//           {`${company.name} ×`}
//         </Badge>
//       ))}
//     </div>
//     <p className="text-sm lg:text-base text-gray-600 mt-2 lg:mt-3 font-medium">
//       종목을 클릭하면 섹터에서 제거됩니다
//     </p>
//   </div>
// )}

//           </CardContent>
//         </Card>
//       ))}
//     </div>
<Card  className="border-none">
  <div>
               <CardTitle className="text-lg lg:text-xl font-bold flex flex-row items-center gap-[20px] mb-[16px]">
                            <span className="cursor-pointer">사용자 정의 섹터</span>
                          </CardTitle>  
         
        </div>
  <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 ">
    <div className="self-start md:mb-0 mb-[16px]"> <SectorDialog  isCreating={isCreating} setIsCreating={setIsCreating} onOpenChange={
(setOpen: boolean) => {
    setIsCreating(setOpen)
    if (!setOpen) {
      setEditingSector(null)
    }
  }

}   editingSector={editingSector}  /></div>
   
<div className="flex items-center gap-2 w-full max-w-md">
  <Input
    placeholder="섹터명, 종목명, 종목코드 검색"
    className="flex-1"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <Button onClick={handleSearch} className="shrink-0 bg-primary/90">
    검색
  </Button>
    <Button variant={"outline"} onClick={handleInit} className="shrink-0">
    초기화
  </Button>
</div>

</div>



   <div className="mt-[16px]">
      <StickyTable defaultColumns={defaultColumns} defaultData={customData}/>
    </div>
 <Pagination
  totalCount={totalCount}
  currentPage={page}
  onPageChange={setPage}
  pageSize={itemsPerPage}
/>
</Card>
  
  )
}
