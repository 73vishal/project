import { NextRequest } from "next/server";

export async function GET(
    request:NextRequest,
    props: {params: Promise<{id: string}>}
)