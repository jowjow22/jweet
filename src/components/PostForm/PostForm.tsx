import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PostCreation } from "@/models/Post";
import { useSession } from "next-auth/react";
import { userForPost } from "@/models/User";
import { Post } from "@/components/Post/Post";
import { Post as PostType } from "@/models/Post";

const FormSchema = z.object({
  postBody: z
    .string()
    .max(250, {
      message: "Post não pode ter mais de 250 caracteres.",
    })
    .min(1, {
      message: "Post não pode ser vazio.",
    }),
});

export function PostForm({
  submitHandler,
  postForRepost,
}: {
  submitHandler: (_data: PostCreation) => void;
  postForRepost?: PostType;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      postBody: "",
    },
  });
  const { toast } = useToast();
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const user = userForPost.parse(session?.user);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const post: PostCreation = {
      user_id: user.id,
      content: data.postBody,
      child_post_id: postForRepost?.id ?? null,
    };
    submitHandler(post);
    form.reset();
    toast({
      title: "Postado com sucesso!",
      description: "Seu post foi publicado com sucesso.",
      variant: "success",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col"
      >
        <div className="px-2 py-2">
          <FormLabel className="flex items-center gap-x-2 text-white mb-2">
            <Avatar>
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>
                {user.name
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            Jweet
          </FormLabel>
        </div>
        <FormField
          control={form.control}
          name="postBody"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="O que você está pensando?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {postForRepost && <Post post={postForRepost} isChildPost />}
        <Button className="self-end" type="submit">
          Postar
        </Button>
      </form>
    </Form>
  );
}
