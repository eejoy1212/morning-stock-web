import React, { useEffect, useState } from 'react';
import MarketCapTable from './market-cap-table';
import { fetchMarketCapList, MarketCapItem, MarketType } from '@/app/domain/kis/api';

const MarketCapPage = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
  const [date, setDate] = useState<string>(formattedDate);
  const [market, setMarket] = useState<MarketType>('전체');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [data, setData] = useState<MarketCapItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = async () => {
    try {
      const res = await fetchMarketCapList({
        date,
        market,
        page,
        pageSize,
      });
      console.log('📈 시가총액 데이터:', res);
      setData(res.data);
      setTotalPages(res.totalPages);
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
      <MarketCapTable data={data} />

      {/* 페이지네이션이 필요하면 아래에 추가 구현 가능 */}
    </div>
  );
};

export default MarketCapPage;
