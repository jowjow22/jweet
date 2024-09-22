import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PostCreation } from "@/models/Post"
import { useSession } from "next-auth/react";
import { userForPost } from "@/models/User";

const FormSchema = z.object({
  postBody: z
    .string()
    .max(250, {
      message: "Bio must not be longer than 250 characters.",
    }),
});

export function PostForm({submitHandler}: {submitHandler: (_data: PostCreation) => void}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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
      child_post_id: null,
    };
    submitHandler(post);
    form.reset();
    toast({
      title: "Postado com sucesso!",
      description: "Seu post foi publicado com sucesso.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col">
        <FormField
          control={form.control}
          name="postBody"
          render={({ field }) => (
            <FormItem>
              <div className="px-2 py-2">
                <FormLabel className="flex items-center gap-x-2 text-white mb-2">
                  <Avatar>
                    <AvatarImage src={user.image ?? ''} />
                    <AvatarFallback>{
                      user.name?.split(" ").map((name) => name[0]).join("")
                      }</AvatarFallback>
                  </Avatar>
                  Jweet
                </FormLabel>
                <FormDescription>
                  Escreva algo legal para seus seguidores.
                </FormDescription>
              </div>
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
        <Button className="self-end" type="submit">Postar</Button>
      </form>
    </Form>
  );
}
