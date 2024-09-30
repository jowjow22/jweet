import { NextRequest, NextResponse } from "next/server";
import { prisma as database } from "../../../database";
export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string, postId: string } }
) {
  const { userId, postId } = params;
  const post = await database.post.findFirst({
    include: {
      childPost: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      likes: {
       where: {
          userId: userId
        }
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      id: postId
    }
  });

  if (post !== null) {
    const liked = post.likes.length > 0
    Object.assign(post, { liked })

    return NextResponse.json(post, { status: 200 });
  }

  return NextResponse.json({ message: "Post not found" }, { status: 404 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { userId: string, postId: string } }
) {
  const { userId, postId } = params;
  const post = await database.post.findFirst({
    where: {
      id: postId
    }
  });

  if (post === null) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  if (post.userId !== userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  if (post.childPostId !== null) {
    await database.post.update({
      where: {
        id: post.childPostId
      },
      data: {
        parentPostId: null
      }
    });
  }

  await database.like.deleteMany({
    where: {
      postId: postId
    }
  });

  await database.post.delete({
    where: {
      id: postId
    }
  });

  return NextResponse.json(post, { status: 200 });
}