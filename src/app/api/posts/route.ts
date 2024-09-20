import { NextRequest, NextResponse } from "next/server";
import { Post, postSchema } from "@/models/Post";
import { main } from "@/app/api/database";

const posts: Post[] = [];

export async function GET() {
  await main();
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
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
  
}
