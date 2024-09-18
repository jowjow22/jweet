"use client";

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

const FormSchema = z.object({
  bio: z
    .string()
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

export function PostForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <div className="px-2 py-2">
                <FormLabel className="flex items-center gap-x-2">
                  <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/51102351?s=400&v=4" />
                    <AvatarFallback>JD</AvatarFallback>
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
