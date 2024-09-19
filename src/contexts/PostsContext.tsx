/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { Post } from "@/models/Post";

const PostsContext = createContext({
    posts: [] as Post[],
    setPosts: (posts: Post[]) => {},
})

export { PostsContext };