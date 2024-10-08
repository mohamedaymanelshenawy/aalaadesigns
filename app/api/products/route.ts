import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  const result = await sql`SELECT * FROM products LIMIT 30`;

  return NextResponse.json(result.rows);
}
