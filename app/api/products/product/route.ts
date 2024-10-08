import { NextResponse, NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const id = searchParams.get("id");
  const result = await sql`SELECT * FROM products WHERE id = ${id}`;

  return NextResponse.json(result.rows[0]);
}
