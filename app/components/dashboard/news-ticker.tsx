"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Card, CardTitle } from "../ui/card"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export interface NewsArticle {
  title: string
  link: string
  image?: string
  
}

interface NewsCarouselProps {
  articles: NewsArticle[]
  sectorNames:string[]
    isAuthenticated: boolean
    isLoading:boolean
}

export default function NewsTicker({sectorNames, articles ,isAuthenticated,isLoading}: NewsCarouselProps) {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 6

  const prev = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0))
  }

  const next = () => {
    setStartIndex((prev) =>
      prev + visibleCount >= articles.length ? prev : prev + visibleCount
    )
  }

  const visibleArticles = articles.slice(startIndex, startIndex + visibleCount)
console.log(visibleArticles)
  return (
    <Card className="border-none gap-[8px] flex flex-col">
            <CardTitle className="text-lg lg:text-xl font-bold mb-1 flex flex-row items-center gap-[20px]">
                            <span className="cursor-pointer">주요 뉴스</span>
                            <ChevronRight className="text-black cursor-pointer" />
                          </CardTitle>  
                          
                          
                          <div className="relative w-full">
                            <div className="flex flex-row justify-between items-end  mb-[6px]">
                               <ul className="flex flex-row overflow-x-scroll snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing">
                              {isAuthenticated?sectorNames.slice(0,6).map(s=>
                              
                              <li key={s}>
                                 <span
  className="inline-flex items-center rounded-full text-sm font-medium text-[#2664EB] px-3 py-1 whitespace-nowrap"
>
  # {s}
</span>
                                </li>):["화제의 뉴스","주식","KOSPI","KOSDAQ"].slice(0,6).map(s=><li key={s}>
                                 <span
  className="inline-flex items-center rounded-full text-sm font-medium text-[#2664EB] px-3 py-1 whitespace-nowrap"
>
  # {s}
</span>
                                </li>)}
                              {sectorNames.length>6&&<span className="font-medium text-[#2664EB]">...</span>}
                         </ul>
                         <div className="flex flex-row gap-[16px]">
                         
        <button
        disabled={startIndex<0}
          onClick={prev}
          className={cn("z-10 bg-opacity-80 rounded-full shadow p-1",startIndex<1?"bg-[#d9d9d9]":"bg-blue-600 cursor-pointer")}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      <button
      disabled={startIndex + visibleCount >=articles.length}
          onClick={next}
          className={cn("z-10 bg-blue-600 bg-opacity-80 rounded-full shadow p-1",startIndex + visibleCount < articles.length?"bg-blue-600 cursor-pointer":"bg-[#d9d9d9]")}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
                   </div>
                            </div>
                          
      {/* 좌측 화살표 */}
      {/* {startIndex > 0 && (
        <button
          onClick={prev}
          className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-blue-600 bg-opacity-80 rounded-full shadow p-1"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )} */}
         <div className="flex justify-start gap-[16px] overflow-hidden">
  {isLoading
    ? [...Array(6)].map((_, idx) => (
        <div
          key={idx}
          className="w-[calc(100%/6-14px)] min-w-[200px] h-[200px] flex-shrink-0"
        >
          <Card className="w-full h-full flex flex-col overflow-hidden">
            <Skeleton className="w-full h-[120px]" />
            <div className="p-2 flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </Card>
        </div>
      ))
    : visibleArticles.map((item, idx) => {
        const imageUrl = item.image
          ? item.image.startsWith("//")
            ? `https:${item.image}`
            : item.image
          : ""
        return (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[calc(100%/6-14px)] min-w-[200px] h-[200px] flex-shrink-0"
          >
            <Card className="w-full h-full flex flex-col overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative w-full h-[120px] overflow-hidden">
                <img src={imageUrl} alt={item.title} className="object-cover" />
              </div>
              <div className="p-2 flex-1">
                <h3 className="text-sm font-medium group-hover:underline leading-snug line-clamp-2">
                  {item.title.replace(/<[^>]*>?/gm, "")}
                </h3>
              </div>
            </Card>
          </a>
        )
      })}
</div>

     

      {/* 우측 화살표 */}
      {/* {startIndex + visibleCount < articles.length && (
        <button
          onClick={next}
          className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-blue-600 bg-opacity-80 rounded-full shadow p-1"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )} */}
    </div>
    </Card>
  
  )
}
