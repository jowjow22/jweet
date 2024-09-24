import { NextRequest, NextResponse } from "next/server";
import { prisma as database } from "../../database";

export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const posts = await database.post.findMany({
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
  });

  posts.forEach(post => {
    const liked = post.likes.length > 0
    Object.assign(post, { liked })
  })

  return NextResponse.json(posts, { status: 200 });
}
