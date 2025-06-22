import axiosInstance from "@/app/lib/base";

export interface TickerItem {
  name: string; // 종목명
  code: string; // 종목 코드 (6자리)
}

export interface MultiItemChartRequest {
  tickers: {
    [sectorName: string]: TickerItem[];
  };
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface StockTableRow {
  date: string; // YYYY-MM-DD
  stocks: {
    [sectorName: string]: {
      [stockName: string]: number; // 종가
    };
  };
}
export async function fetchMultiItemChartData(
  payload: MultiItemChartRequest
): Promise<StockTableRow[]> {
  try {
    const response = await axiosInstance.post<StockTableRow[]>('/kis/itemchart-price/multi', payload);
    return response.data;
  } catch (error: any) {
    console.error('📛 주가 차트 데이터 요청 실패:', error?.response?.data || error.message);
    throw new Error('주가 차트 데이터를 불러오는데 실패했습니다.');
  }
}