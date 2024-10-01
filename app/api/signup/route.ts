import { NextResponse, NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  // Parse the request body to get the user data
  const { email, password, id, username } = await req.json();
  //check the data if valid input

  if (!email || !password || !id || !username) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }
  //check if the user already exist
  const userExist = await sql`SELECT * FROM users WHERE email = ${email}`;

  if (userExist.rows.length > 0) {
    return NextResponse.json(
      { message: "User already exist" },
      { status: 400 }
    );
  }

  // Insert the user data into the database
  const createdat = new Date().toISOString();
  const result = await sql`
    INSERT INTO users (email, password, createdat, username)
    VALUES (${email}, ${password}, ${createdat}, ${username})`;

  if (!result) {
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "user inserted" });
}
