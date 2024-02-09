import { NextResponse } from "next/server";
import { IncomingMessage } from "http";

interface CustomRequest extends IncomingMessage {
  cookies: {
    get: (cookieName: string) => { value: string } | undefined;
  };
  nextUrl: URL;
}

export function middleware(request: CustomRequest): NextResponse {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/sign-up";

  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token.length > 0) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !(token.length > 0)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
