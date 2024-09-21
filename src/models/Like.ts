import { z } from "zod";

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

const likeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  postId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export { likeSchema };
