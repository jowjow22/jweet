import { z } from "zod";

const basePostSchema = z.object({
  id: z.string(),
  user: z.object({
    avatar: z.string(),
    name: z.string(),
  }),
  likes: z.number(),
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