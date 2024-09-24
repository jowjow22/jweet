import { NextRequest, NextResponse } from "next/server";
import { prisma as database } from "../../../../database";

export async function POST(req: NextRequest, { params }: { params: { userId: string, postId: string } }) {
  const { postId, userId } = params
  
  const like  =  await database.like.create({
    data: {
      post: {
        connect: {
          id: postId
        }
      },
      user: {
        connect: {
          id: userId
        }
      }
    }
  })

  return NextResponse.json(like, { status: 200 });
}

export async function GET(req: NextRequest, { params }: { params: { userId: string, postId: string } }) {
  const { postId, userId } = params

  const like = await database.like.findFirst({
    where: {
      postId: postId,
      userId: userId
    }
  })

  if (!like) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(like, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: { userId: string, postId: string } }) {
  const { postId, userId } = params

  const like = await database.like.deleteMany({
    where: {
      postId: postId,
      userId: userId
    }
  })

  return NextResponse.json(like, { status: 200 });
}