import { google } from "googleapis";
import path from "path";
import { NextResponse } from "next/server";

/** 서버 메모리 캐시 객체 */
let cachedRows: string[][] | null = null;
let cachedAt = 0;
const TTL = 24 * 60 * 60 * 1000; // 24h

async function loadSheet() {
  if (cachedRows && Date.now() - cachedAt < TTL) return cachedRows;

  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), "google-service-account.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId: "11A3-jbiDqi5Zg-Dws2117BDzoAVNg7wCSxDjQmsfggw",
    range: "티커정보!A2:B",
  });

  cachedRows = data.values ?? [];
  cachedAt = Date.now();
  return cachedRows;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  if (!q) return NextResponse.json({ rows: [] });

  const rows = await loadSheet();

  const filtered = rows.filter(([name, code]) => {
    const nameMatch = name?.toLowerCase().trim().includes(q);
    const codeMatch = code?.toLowerCase().trim().includes(q);
    return nameMatch || codeMatch;
  });

  const result = filtered.map(([name, code]) => ({
    name: name?.trim() || "",
    code: code?.trim() || "",
  }));

  return NextResponse.json({ rows: result });
}
