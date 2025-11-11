import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    apiPath: "/api/auth",
    redirectURL: `${process.env.KINDE_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/auth/kinde_callback`,
    postLoginRedirectURL: process.env.KINDE_POST_LOGIN_REDIRECT_URL || `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/dashboard`,
    issuerURL: process.env.KINDE_ISSUER_URL || "Not set",
    clientID: process.env.KINDE_CLIENT_ID || "Not set",
    clientSecret: process.env.KINDE_CLIENT_SECRET ? "Set correctly" : "Not set",
    postLogoutRedirectURL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL || `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}`,
    logoutRedirectURL: `${process.env.KINDE_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}`,
    siteURL: process.env.KINDE_SITE_URL || `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}`,
    vercelURL: process.env.VERCEL_URL || "Not set (local development)",
    environment: process.env.NODE_ENV || "development"
  };

  return NextResponse.json(config, { status: 200 });
}
