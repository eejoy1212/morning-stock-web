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
import { useState } from "react"

interface Stock {
  name: string
  ticker: string
  sector: string
}

interface SectorDialogProps {
  isCreating: boolean
  setIsCreating: (val: boolean) => void
  availableStocks: Stock[]
  handleCreateSector: () => void
  newSectorName: string
  setNewSectorName: (val: string) => void
  selectedStocks: string[]
  handleStockSelection: (ticker: string) => void
}

export default function SectorDialog({
  isCreating,
  setIsCreating,
  availableStocks,
  handleCreateSector,
  newSectorName,
  setNewSectorName,
  selectedStocks,
  handleStockSelection,
}: SectorDialogProps) {
  const [aaa,setAAA]=useState()
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
            <Command className="rounded-lg border shadow-sm">
              <CommandInput placeholder="회사명 또는 종목코드 검색" />
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              <div className="max-h-[300px] overflow-y-auto">
                {availableStocks.length > 0 && (
                  <CommandGroup heading="전체 주식">
                    {availableStocks.map((stock) => (
                      <CommandItem
                        key={stock.ticker}
                        value={`${stock.name} ${stock.ticker} ${stock.sector}`}
                        onSelect={() => handleStockSelection(stock.ticker)}
                        className={`flex justify-between items-center ${
                          selectedStocks.includes(stock.ticker)
                            ? "bg-primary/10 border-l-4 border-primary"
                            : ""
                        }`}
                      >
                        <div>
                          <div className="font-medium text-sm">{stock.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {stock.ticker} • {stock.sector}
                          </div>
                        </div>
                        <div className="ml-2 h-4 w-4 rounded-sm border flex items-center justify-center">
                          {selectedStocks.includes(stock.ticker) && (
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
                  const stock = availableStocks.find((s) => s.ticker === ticker)
                  return (
                    <div
                      key={ticker}
                      className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded-md border"
                    >
                      {stock?.name} ({ticker})
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
