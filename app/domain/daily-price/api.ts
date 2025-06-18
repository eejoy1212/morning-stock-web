import axiosInstance from "@/app/lib/base"


export interface DailyPrice {
  name: string
  close: number
  date: string
}

export interface SectorPriceData {
  sectorName: string
  sectorId: string
  stocks: DailyPrice[]
}

export const fetchSectorPrices = async (): Promise<SectorPriceData[]> => {
//   const token = localStorage.getItem("jwt_token")
//   if (!token) throw new Error("로그인이 필요합니다.")

  const response = await axiosInstance.get<{ success: true; data: SectorPriceData[] }>(
    "/daily-price/generate",
    
  )

  return response.data.data
}
