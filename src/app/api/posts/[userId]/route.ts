import { NextRequest, NextResponse } from "next/server";
import { prisma as database }  from "../../database";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const posts = await database.post.findMany({
    where: {
      userId: params.userId
    }
  });
  return NextResponse.json(posts, { status: 200 });
}