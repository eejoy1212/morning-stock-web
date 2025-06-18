import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/app/components/ui/button"

interface PaginationProps {
  totalCount: number
  currentPage: number
  onPageChange: (page: number) => void
  pageSize?: number
  siblingCount?: number // 현재 페이지 양 옆에 몇 개 보여줄지
}

export function Pagination({
  totalCount,
  currentPage,
  onPageChange,
  pageSize = 10,
  siblingCount = 1,
}: PaginationProps) {
  const totalPage = Math.ceil(totalCount / pageSize)

  const DOTS = "..."
  const range = () => {
    const totalPageNumbers = siblingCount * 2 + 5

    if (totalPage <= totalPageNumbers) {
      return Array.from({ length: totalPage }, (_, i) => i + 1)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage)

    const showLeftDots = leftSiblingIndex > 2
    const showRightDots = rightSiblingIndex < totalPage - 1

    const pages: (number | string)[] = []

    if (!showLeftDots && showRightDots) {
      const leftItemCount = siblingCount * 2 + 3
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
      return [...leftRange, DOTS, totalPage]
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = siblingCount * 2 + 3
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPage - rightItemCount + 1 + i
      )
      return [1, DOTS, ...rightRange]
    }

    if (showLeftDots && showRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      )
      return [1, DOTS, ...middleRange, DOTS, totalPage]
    }
  }

  const paginationRange = range()

  if (totalPage <= 1) return null

  return (
    <div className="flex justify-center gap-1 mt-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
              className="w-[36px] h-[36px]"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {paginationRange?.map((page, idx) =>
        page === DOTS ? (
          <span key={idx} className="px-2 py-1 text-gray-500 text-sm">
            ...
          </span>
        ) : (
          <Button
            key={idx}
            size="sm"
            variant={page === currentPage ? "default" : "outline"}
            className={page === currentPage ? "font-bold w-[36px] h-[36px]" : "w-[36px] h-[36px]"}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPage, currentPage + 1))}
        className="w-[36px] h-[36px]"
        disabled={currentPage === totalPage}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(totalPage)}
        disabled={currentPage === totalPage}
           className="w-[36px] h-[36px]"
      >
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
