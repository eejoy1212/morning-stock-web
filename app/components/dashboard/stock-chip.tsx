import React from "react"

interface StockChipProps {
  title: string
}

const StockChip = ({ title }: StockChipProps) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#E8F0FE] text-[#2664EB] border border-[#C3D9FB]">
      {title}
    </span>
  )
}

export default StockChip
