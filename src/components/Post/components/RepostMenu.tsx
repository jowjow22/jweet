import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PostForm } from "../../PostForm/PostForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePostStore } from "@/providers/use-posts-store-provider";
import { createPost, deletePost } from "@/services/posts";
import {
  postSchema,
  Post as PostType,
  PostCreation as PostCreationType,
} from "@/models/Post";
import { Repeat, Pen } from "lucide-react";
import { useSession } from "next-auth/react";
import { userForPost } from "@/models/User";
import { useToast } from "@/hooks/use-toast";

interface IRepostMenuProps {
  post: PostType;
}

export const RepostMenu = ({ post }: IRepostMenuProps) => {
  const [repostModalOpen, setRepostModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { toast } = useToast();

  const { addNewPost, removePost, updatePostObject } = usePostStore(
    (state) => state
  );

  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const user = userForPost.parse(session?.user);

  const shouldUndoRepost =
    post.reposted || (post.content === "" && post.user.id == user.id);

  const submitHandler = async (repost: PostCreationType) => {
    const newPost = await createPost(repost);

    const returnedPost = postSchema.parse(newPost);
    addNewPost(returnedPost);
    setRepostModalOpen(false);
    setMenuOpen(false);
  };

  const repostWithoutComment = async () => {
    const repost: PostCreationType = {
      content: "",
      user_id: user.id,
      child_post_id: post.id,
    };

    const newPost = await createPost(repost);

    const returnedPost = postSchema.parse(newPost);
    addNewPost(returnedPost);
    updatePostObject({
      ...post,
      parentPostId: returnedPost.id,
      reposted: true,
    });
  };

  const handleRepost = async () => {
    setIsButtonDisabled(true);

    await repostWithoutComment();

    setMenuOpen(false);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
    toast({
      title: "Postado com sucesso!",
      description: "Seu post foi publicado com sucesso.",
      variant: "success",
    });
  };

  const undoRepost = async () => {
    setIsButtonDisabled(true);

    await deletePost(user.id, post.parentPostId!);
    updatePostObject({
      ...post,
      reposted: false,
    });
    removePost(post.parentPostId!);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);

    setMenuOpen(false);

    toast({
      title: "Desfeito com sucesso!",
      description: "Seu post foi desfeito com sucesso.",
      variant: "success",
    });
  };

  return (
    <DropdownMenu onOpenChange={setMenuOpen} open={menuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant={shouldUndoRepost ? "destructive" : "outline"}
        >
          <Repeat className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-2 p-2">
        <Dialog open={repostModalOpen} onOpenChange={setRepostModalOpen}>
          <DialogTrigger asChild onClick={() => setRepostModalOpen(true)}>
            <DropdownMenuItem asChild>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Pen className="h-4 w-4 mr-2" />
                Comentário
              </Button>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Repostar</DialogTitle>
            <DialogDescription>
              Você deseja repostar esse post?
            </DialogDescription>
            <PostForm postForRepost={post.content ? post : post.childPost!} submitHandler={submitHandler} />
          </DialogContent>
        </Dialog>
        <DropdownMenuItem className="p-0">
          <Button
            variant={shouldUndoRepost ? "destructive" : "outline"}
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              if (!isButtonDisabled && !shouldUndoRepost) {
                handleRepost();
                return;
              }
              undoRepost();
            }}
            disabled={isButtonDisabled}
          >
            <Repeat className="h-4 w-4 mr-2" />
            {shouldUndoRepost ? "Desfazer" : "Repostar"}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
