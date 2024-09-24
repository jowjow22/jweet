import { z } from "zod";
import { userSchema } from "./User";
import { likeSchema } from "./Like";


const basePostSchema = z.object({
  id: z.string(),
  user: z.lazy(() => userSchema),
  likes: z.lazy(() => z.array(likeSchema)),
  reposts: z.number(),
  content: z.string().optional(),
  hasChildPost: z.boolean(),
  isRepost: z.boolean(),
  comments: z.array(z.string()).optional(),
  _count: z.object({
    likes: z.number(),
  }),
});

export const postCreationSchema = z.object({
  user_id: z.string(),
  content: z.string().max(250),
  child_post_id: z.string().optional().nullable(),
});

type Post = z.infer<typeof basePostSchema> & {
  repost?: Post;
};

type PostCreation = z.infer<typeof postCreationSchema>;

const postSchema: z.ZodType<Post> = basePostSchema.extend({
  repost: z.lazy(() => postSchema).optional(),
});

export { postSchema };
export type { Post, PostCreation };