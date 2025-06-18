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