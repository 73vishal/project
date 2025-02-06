import Imagekit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new Imagekit({
    publicKey:process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint:process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
    try {
        const authenticationPrameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationPrameters);
    } catch (error) {
        console.error("ImageKit authentication error:",error);
        return NextResponse.json(
            {error:"Authentication failed"},
            {
            status:500,
        }
    );
    }
}