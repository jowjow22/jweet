"use client";

import { PostForm } from "@/components/PostForm/PostForm";
import { Post } from "@/components/Post/Post";

export default function Home() {
  const postMock = {
    user: {
      avatar: "https://avatars.githubusercontent.com/u/51102351?s=400&v=4",
      name: "Jonata",
    },
    likes: 0,
    reposts: 0,
    body: "Hello, this is a post",
    hasChildPost: true,
    isRepost: false,
    repost: {
      user: {
        avatar: "https://avatars.githubusercontent.com/u/51102351?s=400&v=4",
        name: "Jonata",
      },
      likes: 0,
      reposts: 0,
      body: "Hello, this is a repost",
      hasChildPost: true,
      isRepost: true,
      repost: {
        user: {
          avatar: "https://avatars.githubusercontent.com/u/51102351?s=400&v=4",
          name: "Jonata",
        },
        likes: 0,
        reposts: 0,
        body: "Hello, this is a repost of a repost",
        hasChildPost: false,
        isRepost: true,
      },
    },
  };
  return (
    <div className="w-full flex flex-col items-center py-10  px-5 md:px-44 gap-y-10">
      <PostForm />
      <Post post={postMock} />
    </div>
  );
}
