import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token?.value) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  try {
    const response = NextResponse.json({
      message: "Logged out successfully",
      success: true,
    });
    response.cookies.set("token", "", { expires: new Date(0) });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
