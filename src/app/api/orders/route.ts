
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server"
import { getAuthSession } from "../auth/[...nextauth]/route";

export const GET = async (req: NextRequest) => {
    const session = await getAuthSession();
    if (session) {
        try {
            if(session.user.isAdmin){
                const orders = await prisma.order.findMany();
                return new NextResponse(JSON.stringify(orders), { status: 200 });
            }else{
                const orders = await prisma.order.findMany({ where: {
                    userEmail: session.user.email!
                }});
                return new NextResponse(JSON.stringify(orders), { status: 200 });
            }
        } catch (err) {
            return new NextResponse(
                JSON.stringify({ message: "something went wrong" }),
                { status: 500 }
            );
        }

    } else {
        return new NextResponse(
            JSON.stringify({ message: "Not authenticated" }),
            { status: 401 }
        );
    }
}