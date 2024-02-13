import { NextResponse, NextRequest } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (!token || token === "") {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }

  const user = await verify(token, process.env.JWT_TOKEN_SECRET || "");

  return NextResponse.json({
    success: true,
    role: (user as JwtPayload).role,
  });
}
