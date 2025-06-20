import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Plus } from "lucide-react"
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/app/components/ui/command"
import { useEffect, useState } from "react"
import { fetchStockSearch, StockInfo } from "@/app/domain/stock/api"
import { useDebounce } from 'use-debounce'; 
import { se } from "date-fns/locale"
import { createSector, createSectorFull } from "@/app/domain/sector/api"

interface Stock {
  name: string
  ticker: string
  sector: string
}

interface SectorDialogProps {
  isCreating: boolean
  setIsCreating: (val: boolean) => void

}

export default function SectorDialog({
  isCreating,
  setIsCreating,
}: SectorDialogProps) {
const [query, setQuery] = useState('');
const [debouncedQuery] = useDebounce(query, 300);
const [availableStocks, setAvailableStocks] = useState<StockInfo[]>([]);
const [selectedStocks, setSelectedStocks] = useState<StockInfo[]>([]);
const [newSectorName, setNewSectorName] = useState("")
useEffect(() => {
  if (!debouncedQuery) return;
  fetchStockSearch(debouncedQuery).then((res) => {
    console.log("검색어:", debouncedQuery)
    console.log("검색 결과:", res)
    setAvailableStocks(res.stocks); 
  }); },
 [debouncedQuery]);
const handleStockSelection = (ticker: string) => {
  setSelectedStocks((prev) =>
    prev.find((stock) => stock.code === ticker)
      ? prev.filter((stock) => stock.code !== ticker)
      : [...prev, availableStocks.find((stock) => stock.code === ticker)!]
  )
}

const handleCreateSector = async() => {
  // 등록 로직 구현

  try {
  const result = await createSectorFull({ name: newSectorName, stocks: selectedStocks });
    console.log("result", result)
  console.log("선택한 주식:", selectedStocks)
  alert("섹터가 생성되었습니다!")
  setIsCreating(false)
  setNewSectorName("")
  setSelectedStocks([])
} catch (error) {
  console.error("❌ 섹터 생성 실패:", error);
}
}

  return (
    <Dialog open={isCreating} onOpenChange={setIsCreating}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
            사용자 정의 섹터
          </h2>
          <p className="text-base lg:text-lg text-gray-700">
            나만의 섹터를 만들고 관리하세요
          </p>
        </div>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsCreating(true)}
            size="default"
            className="text-sm lg:text-base font-semibold h-9 lg:h-10 w-full lg:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> 새 섹터 만들기
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>새 관심 섹터 만들기</DialogTitle>
          <DialogDescription>
            관심 있는 주식을 그룹으로 묶어보세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sector-name">섹터 이름</Label>
            <Input
              id="sector-name"
              placeholder="관심 섹터 이름을 입력하세요"
              value={newSectorName}
              onChange={(e) => setNewSectorName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>주식 선택</Label>
            <Command
              className="rounded-lg border shadow-sm"
            >
              <CommandInput
                placeholder="회사명 또는 종목코드 검색"
                onValueChange={(query: string) => {
                 setQuery(query)
                }}
              />
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              <div className="max-h-[300px] overflow-y-auto">
                {availableStocks.length > 0 && (
                  <CommandGroup heading="전체 주식">
                    {availableStocks.map((stock) => (
                      <CommandItem
                        key={stock.code}
                        value={`${stock.name} (${stock.code}) `}
                        onSelect={() => handleStockSelection(stock.code)}
                        className={`flex justify-between items-center ${
                          selectedStocks.filter((s) => s.code === stock.code)
                            .length > 0
                            ? "bg-primary/10 border-l-4 border-primary"
                            : ""
                        }`}
                      >
                        <div className="flex items-center"  >
                          <div className="font-medium text-sm">{stock.name}</div>
                          <div className="text-xs text-muted-foreground">
                            ({stock.code})
                          </div>
                        </div>
                        <div className="ml-2 h-4 w-4 rounded-sm border flex items-center justify-center">
                          {   selectedStocks.filter((s) => s.code === stock.code)
                            .length > 0 && (
                            <div className="h-2 w-2 rounded-sm bg-primary"></div>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </div>
            </Command>

            {/* 선택된 종목 보여주기 */}
            {selectedStocks.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedStocks.map((ticker) => {
                  const stock = availableStocks.find((s) => s.code === ticker.code)
                  console.log("선택된 종목:", ticker)
                  return (
                    <div
                      key={ticker.code}
                      className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded-md border"
                    >
                      {ticker?.name} ({ticker.code})
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setIsCreating(false)}>
            취소
          </Button>
          <Button onClick={handleCreateSector}>섹터 만들기</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
