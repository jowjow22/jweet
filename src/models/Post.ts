import { z } from "zod";
import { userSchema } from "./User";
import { likeSchema } from "./Like";


const basePostSchema = z.object({
  id: z.string(),
  user: z.lazy(() => userSchema),
  likes: z.lazy(() => z.array(likeSchema)),
  reposts: z.number(),
  body: z.string().optional(),
  hasChildPost: z.boolean(),
  isRepost: z.boolean(),
});

type Post = z.infer<typeof basePostSchema> & {
  repost?: Post;
  comments?: Post[];
};

const postSchema: z.ZodType<Post> = basePostSchema.extend({
  repost: z.lazy(() => postSchema).optional(),
  comments: z.lazy(() => z.array(postSchema)).optional(),
});

export { postSchema };
export type { Post };