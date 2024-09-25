'use client'

import { PostForm } from "@/components/PostForm/PostForm";
import { Post } from "@/components/Post/Post";
import { postSchema, PostCreation as PostType } from "@/models/Post";
import { ListRenderer } from "@/components/utils/ListRenderer/ListRenderer";
import { createPost, getPosts } from "@/services/posts";
import { usePostStore } from "@/providers/use-posts-store-provider";
import { useEffect, useCallback } from "react";

export default function Home() {

  const { posts, addNewPost, setPosts } = usePostStore(
    (state) => state,
  );

  const submitHandler = async (post: PostType) => {
    const newPost = await createPost(post);
    const returnedPost = postSchema.parse(newPost);
    addNewPost(returnedPost);
  };

  const fetchPosts = useCallback(async () => {
    const posts = await getPosts();
    console.log(posts);
    setPosts(posts);
  }, [setPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
