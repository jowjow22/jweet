import { NextRequest, NextResponse } from "next/server";
import PostController from "../../controllers/PostController";


export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  const posts = await PostController.listByUser(userId);

  return NextResponse.json(posts, { status: 200 });
}
