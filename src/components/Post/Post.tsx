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

import {
  postSchema,
  Post as PostType,
  PostCreation as PostCreationType,
} from "@/models/Post";
import { usePostStore } from "@/providers/use-posts-store-provider";
import { cn } from "@/lib/utils";
import { addLike, createPost, removeLike } from "@/services/posts";
import { useSession } from "next-auth/react";
import { userForPost } from "@/models/User";
import { PostForm } from "../PostForm/PostForm";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IPostProps {
  post: PostType;
  isComment?: boolean;
  isChildPost?: boolean;
}

export const Post = ({
  post,
  isComment = false,
  isChildPost = false,
}: IPostProps) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { updatePostLikes, addNewPost } = usePostStore((state) => state);
  const [repostModalOpen, setRepostModalOpen] = useState(false);
  const { data: session } = useSession();
  const { push } = useRouter();

  const submitHandler = async (repost: PostCreationType) => {
    const newPost = await createPost(repost);

    const returnedPost = postSchema.parse(newPost);
    addNewPost(returnedPost);
    setRepostModalOpen(false);
  };

  const { likes } = post._count ?? 0;

  const [liked, setLiked] = useState(post.liked);

  if (!session) {
    return null;
  }

  const user = userForPost.parse(session?.user);

  const handleLikeClick = async () => {
    if (liked) {
      await removeLike(user.id, post.id);
      setLiked(false);
      updatePostLikes(post.id, false);
      return;
    }
    await addLike(user.id, post.id);
    setLiked(true);
    updatePostLikes(post.id, true);
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
          <AvatarImage src={post.user.image ?? ""} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <CardTitle className="dark:hover:text-zinc-300 transition-all">
          {post.user.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          onClick={(e) => {
            e.stopPropagation();
            push(`/home/${post.id}`);
          }}
        >
          {post.childPostId && post.childPost ? (
            <>
              <CardDescription className="mb-4">{post.content}</CardDescription>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  push(`/home/${post.childPostId}`);
                }}
              >
                <Post post={{ ...post.childPost }} isChildPost={true} />
              </div>
            </>
          ) : (
            <CardDescription>{post.content}</CardDescription>
          )}
        </div>
      </CardContent>
      <Conditional condition={!isChildPost}>
        <Conditional.If>
          <CardFooter
            className={cn({
              "flex flex-col items-end gap-x-4": true,
            })}
          >
            <div className="flex gap-x-3">
              <Button variant="outline" onClick={handleLikeClick}>
                <Heart
                  className={cn({
                    "h-4 w-4 mr-2": true,
                    "text-red-500": liked,
                    "fill-current": liked,
                  })}
                />
                {likes}
              </Button>
              <Dialog open={repostModalOpen} onOpenChange={setRepostModalOpen}>
                <DialogTrigger asChild onClick={() => setRepostModalOpen(true)}>
                  <Button variant="outline" size="icon">
                    <Repeat className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Repostar</DialogTitle>
                  <DialogDescription>
                    Você deseja repostar esse post?
                  </DialogDescription>
                  <PostForm
                    postForRepost={post}
                    submitHandler={submitHandler}
                  />
                </DialogContent>
              </Dialog>
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
                  <CommentForm submitHandler={() => console.log("comment")} />
                </div>
              </Conditional.If>
            </Conditional>
            {/*             {post.comments && post.comments.length > 0 ? (
              <section className="mt-10 flex flex-col w-full">
                <ListRenderer
                  ChildComponent={Post}
                  items={post.comments}
                  keyValue="id"
                  itemPropName="post"
                  extraProps={{ isComment: true }}
                />
              </section>
            ) : null} */}
          </CardFooter>
        </Conditional.If>
      </Conditional>
    </Card>
  );
};
