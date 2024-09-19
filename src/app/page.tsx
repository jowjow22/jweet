"use client";

import { PostForm } from "@/components/PostForm/PostForm";
import { Post } from "@/components/Post/Post";
import { Post as PostType } from "@/models/Post";
import { useEffect, useState } from "react";
import { ListRenderer } from "@/components/utils/ListRenderer/ListRenderer";
import { PostsContext } from "@/contexts/PostsContext";
import { createPost, getPosts } from "@/services/posts";

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  const submitHandler = async (post: PostType) => {
    await createPost(post);
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
      }}
    >
      <div className="w-full flex flex-col items-center py-10  px-5 md:px-44 gap-y-10">
        <PostForm submitHandler={submitHandler} />
        <ListRenderer
          ChildComponent={Post}
          items={posts}
          keyValue="id"
          itemPropName="post"
        />
      </div>
    </PostsContext.Provider>
  );
}
