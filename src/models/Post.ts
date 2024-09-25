import { z } from "zod";
import { userSchema } from "./User";
import { likeSchema } from "./Like";


const basePostSchema = z.object({
  id: z.string(),
  user: z.lazy(() => userSchema),
  likes: z.lazy(() => z.array(likeSchema)),
  content: z.string().optional(),
  childPostId: z.string().optional().nullable(),
  isRepost: z.boolean().optional(),
  comments: z.array(z.string()).optional(),
  _count: z.object({
    likes: z.number(),
  }),
  liked: z.boolean().optional(),
});

export const postCreationSchema = z.object({
  user_id: z.string(),
  content: z.string().max(250),
  child_post_id: z.string().optional().nullable(),
});

type Post = z.infer<typeof basePostSchema> & {
  childPost?: Post;
};

type PostCreation = z.infer<typeof postCreationSchema>;

const postSchema: z.ZodType<Post> = basePostSchema.extend({
  childPost: z.lazy(() => postSchema).optional().nullable(),
});

export { postSchema };
export type { Post, PostCreation };