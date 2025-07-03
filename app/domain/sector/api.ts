import axiosInstance from "@/app/lib/base"
import { Stock, StockInfo } from "../stock/api";


export interface CreateSectorPayload {
  name: string;
  stocks?: StockInfo[]; // 주식의 ticker 배열
}

export async function createSector(payload: CreateSectorPayload): Promise<any> {

  const response = await axiosInstance.post("/sector", payload, {

  });

  return response.data;
}
export async function createSectorFull(payload: CreateSectorPayload): Promise<any> {

  const response = await axiosInstance.post("/sector/full", payload, {

  });

  return response.data;
}
export interface Sector {
  id: string
  name: string
  userId: string
  createdAt: string // ISO string
  stocks: Stock[] // 추후 주식 데이터 타입이 정해지면 명확히 정의 가능
}

export interface GetSectorsResponse {
  success: boolean
  total: number
  page: number
  limit: number
  sectors: Sector[]
}
export async function fetchSectors(search:string,page:number,limit:number): Promise<GetSectorsResponse> {

  const response = await axiosInstance.get<GetSectorsResponse>("/sector", {
  params: {q:search, page, limit }
})

  return response.data
}
export async function fetchSectorsNameOnly(search:string): Promise<GetSectorsResponse> {

  const response = await axiosInstance.get<GetSectorsResponse>("/sector/name-only", {
  params: {q:search }
})

  return response.data
}

export async function deleteSector(sectorId: string): Promise<{ success: boolean }> {
  try {
    const res = await axiosInstance.delete(`/sector/${sectorId}`, {
    });
    return res.data;
  } catch (error: any) {
    console.error("섹터 삭제 실패:", error?.response?.data || error.message);
    throw error;
  }
}
export interface SectorNewsArticle {
  title: string
  link: string
  pubDate: string
  source_id: string
}

export interface FetchSectorNewsResponse {
  success: boolean
  articles: SectorNewsArticle[]
  sectorNames:string[]
}

export async function fetchSectorNews(): Promise<FetchSectorNewsResponse> {

  const res = await axiosInstance.get<FetchSectorNewsResponse>("/sector/news", {
 
  })

  return res.data
}
export interface MonthlyTopSector {
  sectorName: string
  rate: number
}

export async function fetchMonthlyTopSectors(): Promise<MonthlyTopSector[]> {
  try {
    const response = await axiosInstance.get("/sector/monthly-gainers")
    const data = response.data

    if (data.success && Array.isArray(data.sectors)) {
      return data.sectors
    } else {
      console.warn("Unexpected response format:", data)
      return []
    }
  } catch (error) {
    console.error("📉 월간 섹터 상승률 조회 실패:", error)
    return []
  }
}

export interface UpdateSectorPayload {
  name: string;
  stocks: {
    name: string;
    code: string;
  }[];
}


export async function updateSector(id: string, payload: UpdateSectorPayload): Promise<any> {
  try {
    const res = await axiosInstance.put(`/sector/${id}`, payload);
    return res.data;
  } catch (err: any) {
    console.error("섹터 수정 실패:", err.response?.data || err.message);
    throw err;
  }
}
