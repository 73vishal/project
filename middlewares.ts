import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(){
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized:({token, req}) => {
            const {pathname} = req.nextUrl
            if(
                pathname.startsWith("/api/auth") ||
                pathname === "/login" ||
                pathname === "/register"
            ){
                return true;
            }
            },
        },
    }
);

export const config = {matcher: ["/admin"]};