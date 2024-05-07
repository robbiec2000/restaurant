import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


export const PUT = async (req: NextRequest, { params }: { params: { intentId: string } }) => {
  const { intentId } = params;

  try {
    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: {
        status: "being prepared"
      }
    });

    return new NextResponse(JSON.stringify({message: "Order has been updated"}), {status: 200});

  }catch(err){
    console.log(err);
    return new NextResponse(JSON.stringify({message: "Something wrong"}), {status: 500});
  }
}