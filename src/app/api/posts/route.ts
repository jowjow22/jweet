import { NextRequest, NextResponse } from "next/server";
import { Post, postSchema } from "@/models/Post";

const posts: Post[] = [];

export async function GET(req: NextRequest) {
  return NextResponse.json(posts, { status: 200 });
}

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const data = await req.json();

    try {
        const newPost = postSchema.parse(data);
        posts.push(newPost);
        return NextResponse.json(newPost, { status: 201 });
    } catch (_error) {
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
  
}
