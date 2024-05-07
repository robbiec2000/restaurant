
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server"


export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        const body = await req.json();

        await prisma.order.update({
            where: {
                id: id
            },
            data: {
                status: body
            }
        });

        return new NextResponse(
            JSON.stringify({ message: "Update order success" }),
            { status: 200 }
        );

    } catch (err) {
        return new NextResponse(
            JSON.stringify({ message: "something went wrong" }),
            { status: 500 }
        );
    }


}