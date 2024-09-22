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
import { Post } from "@/models/Post"
import { useSession } from "next-auth/react";

const FormSchema = z.object({
  postBody: z
    .string()
    .max(250, {
      message: "Bio must not be longer than 250 characters.",
    }),
});

export function PostForm({submitHandler}: {submitHandler: (_data: Post) => void}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { toast } = useToast();
  const { data: session } = useSession();

  const user = session?.user;
  if (!user) {
    return null;
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const post: Post = {
      id: Math.random().toString(36).substr(2, 9),
      user: {
        image: "https://avatars.githubusercontent.com/u/51102351?s=400&v=4",
        createdAt: new Date(),
        name: "Jonata",
        email: "jonata@gmail.com",
        id: "1",
        updatedAt: new Date(),
        likes: [],
        posts: [],
      },
      likes: [],
      reposts: 0,
      body: data.postBody,
      hasChildPost: false,
      isRepost: false,
      comments: [],
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
