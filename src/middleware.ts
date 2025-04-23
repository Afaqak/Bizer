import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Cache static assets for 1 year
  if (
    req.nextUrl.pathname.startsWith("/_next/static") ||
    req.nextUrl.pathname.includes(".")
  ) {
    res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }

  return res;
}
