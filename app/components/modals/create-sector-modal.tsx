"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { createSector } from "@/app/domain/sector/api"
import { Dialog, DialogContent } from "@radix-ui/react-dialog"
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"



interface CreateSectorModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateSector: (sectorName: string) => void
}

export function CreateSectorModal({ isOpen, onClose, onCreateSector }: CreateSectorModalProps) {
  const [sectorName, setSectorName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sectorName.trim()) {
      // onCreateSector(sectorName.trim())
      const res = await createSector({ name: sectorName.trim() })
      if (res.success) {
        alert(`"${sectorName.trim()}" 섹터가 생성되었습니다.`)
         onCreateSector(sectorName.trim())
           setSectorName("")
      }
      console.log(res)
    
    }
  }

  const handleClose = () => {
    setSectorName("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] border shadow-lg">
        <DialogHeader className="pb-4 lg:pb-5">
          <DialogTitle className="flex items-center gap-3 text-lg lg:text-xl font-bold">
            <Plus className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />새 섹터 만들기
          </DialogTitle>
          <DialogDescription className="text-sm lg:text-base text-gray-700">
            새로운 커스텀 섹터를 만들어 관심 종목을 그룹으로 관리하세요. 엔터주, 로봇주, 배터리주 등 테마별로 분류할 수
            있습니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 lg:gap-5 py-4 lg:py-5">
            <div className="space-y-2 lg:space-y-3">
              <Label htmlFor="sector-name" className="text-sm lg:text-base font-bold">
                섹터 이름
              </Label>
              <Input
                id="sector-name"
                placeholder="예: 엔터주, 로봇주, 배터리주, K-뷰티주"
                value={sectorName}
                onChange={(e) => setSectorName(e.target.value)}
                autoFocus
                className="h-9 lg:h-10 text-sm lg:text-base border"
              />
              <p className="text-xs lg:text-sm text-gray-600 font-medium">
                섹터 이름은 나중에 수정할 수 있습니다. 관심 있는 테마나 업종으로 명명해보세요.
              </p>
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              size="sm"
              className="text-sm lg:text-base font-semibold border h-9 lg:h-10 px-4 lg:px-5"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={!sectorName.trim()}
              size="sm"
              className="text-sm lg:text-base font-semibold h-9 lg:h-10 px-4 lg:px-5"
            >
              섹터 만들기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
