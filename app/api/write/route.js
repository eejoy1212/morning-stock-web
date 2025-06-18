import { google } from "googleapis";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";
import path from "path";
import iconv from "iconv-lite";

export async function GET() {
  try {
    // 1. EUC-KR 인코딩 HTML 페이지 가져오기
    const htmlRes = await fetch("http://kind.krx.co.kr/corpgeneral/corpList.do?method=download&searchType=13");
    const buffer = await htmlRes.arrayBuffer();

    // 2. EUC-KR → UTF-8 변환
    const htmlText = iconv.decode(Buffer.from(buffer), "euc-kr");

    // 3. DOM 파싱
    const dom = new JSDOM(htmlText);
    const rows = [...dom.window.document.querySelectorAll("body table tr")];

    // 4. 회사명 + 종목코드 추출
    const values = [["회사명", "티커코드"]];
    for (const row of rows) {
      const cols = row.querySelectorAll("td");
      if (cols.length >= 2) {
        const name = cols[0].textContent?.trim();
        const code = cols[1].textContent?.trim();
        if (name && code && /^\d+$/.test(code)) {
          values.push([name, code]);
        }
      }
    }

    // 5. Google Sheets 연동
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), "google-service-account.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = "11A3-jbiDqi5Zg-Dws2117BDzoAVNg7wCSxDjQmsfggw";
    const sheetName = "티커정보";

    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `${sheetName}!A1:B`,
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values },
    });

    return NextResponse.json({ success: true, count: values.length - 1 });
  } catch (error) {
    console.error("🔥 오류 발생:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
