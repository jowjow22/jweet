import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "@/models/Post";
import { prisma as database }  from "../database";
import { ZodError } from "zod";

export async function GET() {
  const posts = await database.post.findMany();
  return NextResponse.json(posts, { status: 200 });
}

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const data = await req.json();

  try {
    postSchema.parse(data);
    const post = await database.post.create({ data });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.errors }, { status: 400 });
    } else {
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  
}
