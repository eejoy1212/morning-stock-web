import { google } from "googleapis";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    /* 1) 서비스-계정 인증 초기화 */ 
      // console.log(path.join(process.cwd(), "google-service-account.json"))
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), "google-service-account.json"), // 루트에 있는 키 파일
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
 
    const sheets = google.sheets({ version: "v4", auth });

    /* 2) 시트 ID·범위 지정 */
    const spreadsheetId = "11A3-jbiDqi5Zg-Dws2117BDzoAVNg7wCSxDjQmsfggw";    // ❶ /d/ 와 /edit 사이 문자열
    const range = "종가기록!A2:C";                   // ❷ 시트 탭 이름!범위

    /* 3) 값 읽기 */
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = data.values ?? []; // [ [날짜, 회사명, 종가], ... ]

    /* 4) 가공: 객체 배열로 변환 */
    const result = rows.map(([date, company, close]) => ({
      날짜: date,
      회사명: company,
      종가: Number(close), // 숫자로 변환
    }));

    return NextResponse.json({ success: true, count: result.length, rows: result });
  } catch (err) {
    console.error("🔥 종가기록 API 오류:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
