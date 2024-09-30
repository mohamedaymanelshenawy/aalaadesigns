import { NextResponse } from "next/server";
//import { sql } from "@vercel/postgres";

//export async function GET() {
//  const result = await sql`SELECT * FROM users`;

//  return NextResponse.json({ Users: result.rows });
//}
export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}
