
import { postSchema, Post } from './Post'
import { Like, likeSchema } from './Like'
import { z } from 'zod'

const baseUserCreationSchema = z.object({
  email: z.string(),
  name: z.string().nullable(),
  username: z.string(),
  image: z.string().nullable(),
  password: z.string(),
})

const baseUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const userForPost = z.object({
  id: z.string(),
  name: z.string().nullable(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof baseUserSchema> & {
  posts?: Post[]
  likes?: Like[]
}

const userSchema: z.ZodType<User> = baseUserSchema.extend({
  posts: z.lazy(() => z.array(postSchema)).default([]),
  likes: z.lazy(() => z.array(likeSchema)).default([]),
})

export { userSchema, baseUserCreationSchema }
