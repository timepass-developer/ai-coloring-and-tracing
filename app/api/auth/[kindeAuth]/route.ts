import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = handleAuth({
    postLoginRedirect: "/",        // after login → home page
    postRegisterRedirect: "/",     // after register → home page
    postLogoutRedirect: "/"        // after logout → home page
});
