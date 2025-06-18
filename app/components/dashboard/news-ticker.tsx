"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Card, CardTitle } from "../ui/card"

export interface NewsArticle {
  title: string
  link: string
  image?: string
}

interface NewsCarouselProps {
  articles: NewsArticle[]
}

export default function NewsTicker({ articles }: NewsCarouselProps) {
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
const stocks=["#삼성전자","#하이브","#구글코리아","#SM엔터테인먼트","#LG텔레콤","#삼성전기",]
  const visibleArticles = articles.slice(startIndex, startIndex + visibleCount)
console.log(visibleArticles)
  return (
    <Card className="border-none gap-[8px] flex flex-col">
            <CardTitle className="text-lg lg:text-xl font-bold mb-1 flex flex-row items-center gap-[20px] ">
                            <span>주요 뉴스</span>
                            {/* <Button size={"icon"} className="bg-transparent hover:bg-transparent"> */}
                            <ChevronRight className="text-black cursor-pointer" />
                            {/* </Button> */}
                          </CardTitle>  <div className="relative w-full">
                            <ul className="flex flex-row">
                              {stocks.map(s=><li key={s}>
                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-[#2664EB]">
                                 {s}
                                 </span>
                                </li>)}
                              
                         </ul>
      {/* 좌측 화살표 */}
      {startIndex > 0 && (
        <button
          onClick={prev}
          className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-blue-600 bg-opacity-80 rounded-full shadow p-1"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}
         <div className="flex justify-start  gap-[16px] overflow-hidden">
        {visibleArticles.map((item, idx) => 
      {
        const imageUrl = item.image
          ? item.image.startsWith("//")
            ? `https:${item.image}`
            : item.image
          : ""
        return    <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[calc(100%/6-14px)] min-w-[200px] h-[200px] flex-shrink-0"
          >
            <Card className="w-full h-full flex flex-col overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative w-full h-[120px] overflow-hidden">
                <img src={item.image} alt={item.title} className="object-cover "/>
{/* 
    <Image
      src={imageUrl} // 기존: //cdn.emo... → 수정: https://cdn...
      alt={item.title}
      fill
      className="object-cover"
    /> */}
                </div>
              <div className="p-2 flex-1">
                <h3 className="text-sm font-medium group-hover:underline leading-snug line-clamp-2">
                  {item.title.replace(/<[^>]*>?/gm, "")}
                </h3>
              </div>
            </Card>
          </a>}
        )}
      </div>
     

      {/* 우측 화살표 */}
      {startIndex + visibleCount < articles.length && (
        <button
          onClick={next}
          className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-blue-600 bg-opacity-80 rounded-full shadow p-1"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
    </Card>
  
  )
}
