'use client'

import { PostForm } from "@/components/PostForm/PostForm";
import { Post } from "@/components/Post/Post";
import { Post as PostType } from "@/models/Post";
import { ListRenderer } from "@/components/utils/ListRenderer/ListRenderer";
import { createPost } from "@/services/posts";
import { usePostStore } from "@/providers/use-posts-store-provider";

export default function Home() {

  const { posts, addNewPost } = usePostStore(
    (state) => state,
  );

  const submitHandler = async (post: PostType) => {
    const newPost = await createPost(post);
    addNewPost(newPost);
  };

  return (
      <div className="w-full flex flex-col items-center py-10  px-5 md:px-44 gap-y-10">
        <PostForm submitHandler={submitHandler} />
        <ListRenderer
          ChildComponent={Post}
          items={posts}
          keyValue="id"
          itemPropName="post"
        />
      </div>
  );
}
