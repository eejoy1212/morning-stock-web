// src/domain/stock/api.ts
import axiosInstance from "@/app/lib/base"

export interface Stock {
  id: string;
  name: string;
  code: string;
  sectorId: string;
}
interface AddStockPayload {
  sectorId: string
  name: string
  code:string
}

export async function addStockToSector(payload: AddStockPayload) {

  const response = await axiosInstance.post(
    "/stock",
    payload,
   
  )

  return response.data
}
export async function deleteStock(stockId: string): Promise<{ success: boolean }> {
  try {
    const response = await axiosInstance.delete(`/stock/${stockId}`, {
    
    });
    return response.data;
  } catch (error: any) {
    console.error("종목 삭제 실패:", error?.response?.data || error.message);
    throw error;
  }
}

export interface StockInfo {
  name: string;       // 회사명
  code: string;       // 종목코드
  market?: string;    // 코스피/코스닥 등
  createdAt?: string; // (선택) DB 등록일
}

/**
 * 회사명 또는 종목코드로 주식 정보 검색
 * @param query 검색어 (회사명 or 종목코드 일부)
 * @returns StockInfo[]
 */
interface StockSearchResult {
  success: boolean;
  stocks: StockInfo[];
}
export async function fetchStockSearch(query: string): Promise<StockSearchResult> {
  if (!query.trim()) return { success: true, stocks: [] };

  try {
    const res = await axiosInstance.get<StockSearchResult>('/stock/search-company', {
      params: { q: query }
    });
    console.log('📈 종목 검색 결과:', res.data);
    return res.data;
  } catch (err) {
    console.error('📉 종목 검색 실패:', err);
  return { success: false, stocks: [] };
  }
}
