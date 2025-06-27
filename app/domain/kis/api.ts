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
export type MarketType = '전체' | 'KOSPI' | 'KOSDAQ';

export interface MarketCapItem {
  code: string;
  name: string;
  market: string;
  closePrice: number;
  diffPrice: number;
  diffRate: number;
  volume: number;
  tradeAmount: string;
  marketCap: string;
  marketCapRatio: number;
  sharesOutstanding: string;
  date: string;
  createdAt?: string;
  rank: number;
}

export interface MarketCapResponse {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  data: MarketCapItem[];
}
export async function fetchMarketCapList({
  date,
  market = '전체',
  page = 1,
  pageSize = 20,
}: {
  date: string; // YYYY-MM-DD
  market?: MarketType;
  page?: number;
  pageSize?: number;
}): Promise<MarketCapResponse> {
  try {
    const response = await axiosInstance.get<MarketCapResponse>('/kis/search-market-cap', {
      params: { date, market, page, pageSize },
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ 시가총액 데이터 요청 실패:', error);
    throw new Error(error.response?.data?.error || '시가총액 데이터를 가져오지 못했습니다.');
  }
}
export interface TopGainerItem {
  code: string;
  name: string;
  market: string;
  closePrice: number;
  diffPrice: number;
  diffRate: number;
  volume: number;
  tradeAmount: string; // BigInt → string 변환됨
  marketCap: string;
  marketCapRatio: number;
  sharesOutstanding: string;
  date: string; // ISO 날짜 문자열
  rank: number;
}
export interface TopGainersResponse {
  data: TopGainerItem[];
}

/**
 * 오늘의 급등 종목 Top 20을 불러옵니다.
 * @param date YYYY-MM-DD 형식 (예: '2025-06-23')
 * @param market '전체' | 'KOSPI' | 'KOSDAQ'
 */
export async function fetchTopGainers(date: string, market: '전체' | 'KOSPI' | 'KOSDAQ' = '전체'): Promise<TopGainerItem[]> {
  try {
    const response = await axiosInstance.get<TopGainersResponse>('/kis/top-gainers', {
      params: { date, market },
    });
    return response.data.data;
  } catch (error) {
    console.error('📛 급등 종목 조회 실패:', error);
    throw error;
  }
}

// types.ts (예시)
export interface TradeAmountItem {
  rank: number;
  code: string;
  name: string;
  market: string;
  closePrice: number;
  diffPrice: number;
  diffRate: number;
  volume: number;
  tradeAmount: string;
  marketCap: string;
  marketCapRatio: number;
  sharesOutstanding: string;
  date: string;
}
export async function fetchTopTradeAmount(date: string, market: '전체' | 'KOSPI' | 'KOSDAQ' = '전체'): Promise<TradeAmountItem[]> {
  try {
    const res = await axiosInstance.get<{ data: TradeAmountItem[] }>('/kis/top-trade-amount', {
      params: { date, market },
    });
    return res.data.data;
  } catch (error) {
    console.error('📛 거래대금 상위 종목 조회 실패:', error);
    throw error;
  }
}