import { connetToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request:NextRequest,
    props: {params: Promise<{id: string}>}
) {
    try {
        const {id} = await props.params;
        await connetToDatabase();
        const product = await Product.findById(id).lean();

        if (!product){
            return NextResponse.json({error: "No product found"},{
            status:404 });
        }
        return NextResponse.json({product}, {status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error:"Something went wrong"},
            {status: 500}
        );
        
    }
}