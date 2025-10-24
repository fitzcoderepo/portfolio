
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = { matcher: ["/admin/:path*"] };

export function middleware(req: NextRequest) {
    const isLogin = req.nextUrl.pathname.startsWith("/admin/login");
    if (isLogin) return NextResponse.next();

    const session = req.cookies.get("admin")?.value;
    if (session === "ok") return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
}