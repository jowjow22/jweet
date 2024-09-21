import { Button } from "../ui/button";
import { useState } from "react";
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

import { PostForm as CommentForm } from "../PostForm/PostForm";
import { Separator } from "../ui/separator";

import { Post as PostType } from "@/models/Post";
import { ListRenderer } from "../utils/ListRenderer/ListRenderer";
import { usePostStore } from "@/providers/use-posts-store-provider";
import { cn } from "@/lib/utils";

interface IPostProps {
  post: PostType;
  isComment?: boolean;
}

export const Post = ({ post, isComment = false }: IPostProps) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { posts } = usePostStore((state) => state);

  const currentPostIndex = posts.findIndex((p) => p.id === post.id);

  const handleCommentSubmit = (comment: PostType) => {
    const currentPost = posts[currentPostIndex];
    if (!post.comments) {
      currentPost.comments = [comment];
    }

    const postComment: PostType = {
      ...comment,
      user: {
        avatar: "https://avatars.githubusercontent.com/u/51102351?s=400&v=4",
        createdAt: new Date(),
        name: "Jonata",
        email: "jonata@gmail.com",
        id: "1",
        updatedAt: new Date(),
        username: "jonata",
        likes: [],
        posts: [],
      },
    };

    currentPost.comments?.push(postComment);

    const updatedPosts = [...posts];

    updatedPosts[currentPostIndex] = currentPost;
  };

  return (
    <Card
      className={cn({
        "w-full": true,
        "mt-6": isComment,
      })}
    >
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
        {post.hasChildPost && !post.isRepost && post.repost ? (
          <>
            <CardDescription className="mb-2">{post.body}</CardDescription>
            <Post post={{ ...post.repost }} />
          </>
        ) : (
          <CardDescription>{post.body}</CardDescription>
        )}
      </CardContent>
      <Conditional condition={!post.isRepost}>
        <Conditional.If>
          <CardFooter
            className={cn({
              "flex flex-col items-end gap-x-4": true,
            })}
          >
            <div className="flex gap-x-3">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Repeat className="h-4 w-4" />
              </Button>
              <Conditional condition={!isComment}>
                <Conditional.If>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowCommentForm(!showCommentForm)}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </Conditional.If>
              </Conditional>
            </div>
            <Conditional condition={showCommentForm}>
              <Conditional.If>
                <Separator className="mb-5 mt-5" />
                <div className="w-11/12 self-center">
                  <CommentForm submitHandler={handleCommentSubmit} />
                </div>
              </Conditional.If>
            </Conditional>
            {post.comments && post.comments.length > 0 ? (
              <section className="mt-10 flex flex-col w-full">
                <ListRenderer
                  ChildComponent={Post}
                  items={post.comments}
                  keyValue="id"
                  itemPropName="post"
                  extraProps={{ isComment: true }}
                />
              </section>
            ) : null}
          </CardFooter>
        </Conditional.If>
      </Conditional>
    </Card>
  );
};
