import { NextRequest, NextResponse } from "next/server";
import { postCreationSchema } from "@/models/Post";
import { prisma as database }  from "../database";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const data = await req.json();

  try {
    const {user_id, ...rest} = postCreationSchema.parse(data);
    

    const post = await database.post.create({
      data: {
        content: rest.content,
        childPost: {
          connect: rest.child_post_id ? { id: rest.child_post_id } : undefined,
        },
        user: {
          connect: {
            id: user_id,
          },
        },
      },
      include: {
        user: true,
        likes: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    
    Object.assign(post, { liked: false });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.errors }, { status: 400 });
    } else {
      console.log(error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  
}
