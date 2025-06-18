import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: '✅ API 연결 성공! 이건 테스트 응답입니다.',
    timestamp: new Date().toISOString(),
  });
}
