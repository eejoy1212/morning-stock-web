import React, { useEffect, useState } from 'react';
import MarketCapTable, { MarketCapRow } from './market-cap-table';
import { fetchMarketCapList, fetchTopGainers, MarketCapItem, MarketType } from '@/app/domain/kis/api';
import { ColumnDef } from '@tanstack/react-table';

const GainerPage = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
  const [date, setDate] = useState<string>(formattedDate);
  const [market, setMarket] = useState<MarketType>('전체');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [data, setData] = useState<MarketCapItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

const columns: ColumnDef<MarketCapRow>[] = [
  { header: '순위', accessorKey: 'rank' },
  { header: '종목명', accessorKey: 'name' },
  { header: '시장구분', accessorKey: 'market' },
  { header: '종가', accessorKey: 'closePrice' },
  { header: '대비', accessorKey: 'diffPrice',cell: info => {
    const value = info.getValue() as number;
    const color = value > 0 ? 'text-red-500 font-bold' : value < 0 ? 'text-blue-500 font-bold' : 'text-gray-700 ';
    const sign = value > 0 ? '▲' : value < 0 ? '▼' : '';
    return <div  className="flex gap-1"> 

    <span className={color}>{sign}
         {Number(value).toLocaleString()}
    </span>

    </div>
    
  }, },
 {
  header: '등락률',
  accessorKey: 'diffRate',
  cell: info => {
    const value = info.getValue() as number;
    const color = value > 0 ? 'text-red-500 font-bold' : value < 0 ? 'text-blue-500 font-bold' : 'text-gray-700 ';
    const sign = value > 0 ? '+' : value < 0 ? '' : '';
    return <div  className="flex gap-1"> 

    <span className={color}>{sign}{value.toFixed(2)}%</span>

    </div>
    
  },
},
  { header: '거래량', accessorKey: 'volume' },
  { header: '거래대금', accessorKey: 'tradeAmount' },
  { header: '시가총액', accessorKey: 'marketCap' },
  //잠시 제외
  // { header: '시가총액 비중', accessorKey: 'marketCapRatio' },
  { header: '상장주식수', accessorKey: 'sharesOutstanding' },
];
  const fetchData = async () => {
    try {
      const res = await fetchTopGainers(
        date,
        market,
      );
      console.log('📈 급등종목 데이터:', res);
      setData(res);
    //   setTotalPages(res.totalPages);
    } catch (error) {
      console.error('Error fetching market cap data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date, market, page, pageSize]);

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex flex-row gap-4 items-center'>
        {/* 📅 날짜 선택 */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>날짜</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='border px-2 py-1 rounded'
          />
        </div>

        {/* 📊 시장 선택 드롭다운 */}
        {/* <div>
          <label className='block text-sm font-medium text-gray-700'>시장</label>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value as MarketType)}
            className='border px-2 py-1 rounded'
          >
            <option value='전체'>전체</option>
            <option value='KOSPI'>KOSPI</option>
            <option value='KOSDAQ'>KOSDAQ</option>
          </select>
        </div> */}
      </div>

      {/* 📋 데이터 테이블 */}
      <MarketCapTable data={data} columns={columns}/>

      {/* 페이지네이션이 필요하면 아래에 추가 구현 가능 */}
    </div>
  );
};

export default GainerPage;
