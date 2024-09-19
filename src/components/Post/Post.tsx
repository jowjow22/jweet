import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Heart, MessageCircle, Repeat } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Conditional } from "../utils/ConditionalRendering/ConditionalRendering";
import { z } from "zod";
import { PostForm } from "../PostForm/PostForm";
import { Separator } from "../ui/separator";

const basePostSchema = z.object({
  user: z.object({
    avatar: z.string(),
    name: z.string(),
  }),
  likes: z.number(),
  reposts: z.number(),
  body: z.string(),
  hasChildPost: z.boolean(),
  isRepost: z.boolean(),
});

type Post = z.infer<typeof basePostSchema> & {
  repost: Post | null;
};

const postSchema: z.ZodType<Post> = basePostSchema.extend({
  repost: z.lazy(() => z.union([postSchema, z.literal(null)])),
});

interface IPostProps {
  post: Post;
}

export const Post = ({ post }: IPostProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row gap-x-3 items-start cursor-pointer">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/51102351?s=400&v=4" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <CardTitle className="dark:hover:text-zinc-300 transition-all">
          {post.user.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {post.hasChildPost && !post.isRepost ? (
          <>
            <CardDescription className="mb-2">{post.body}</CardDescription>
            <Post post={{ ...post.repost }} />
          </>
        ) : (
          <CardDescription>{post.body}</CardDescription>
        )}
      </CardContent>
      <Conditional condition={post.hasChildPost && !post.isRepost}>
        <Conditional.If>
          <CardFooter className="flex flex-col items-end gap-x-4">
            <div className="flex gap-x-3">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Repeat className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
            <Separator className="mb-5 mt-5" />
            <div className="w-11/12 self-center">
              <PostForm />
            </div>
          </CardFooter>
        </Conditional.If>
      </Conditional>
    </Card>
  );
};
