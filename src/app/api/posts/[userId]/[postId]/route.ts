import { NextRequest } from "next/server";

import PostController from "../../../controllers/PostController";

export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string, postId: string } }
) {

  return await PostController.findWithFullInfo({params});
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { userId: string, postId: string } }
) {
  const { userId, postId } = params;

  PostController.delete(userId, postId);
}