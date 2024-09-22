import { createStore } from 'zustand/vanilla'
import { Post } from '@/models/Post'

export type PostState = {
  posts: Post[]
}

export type PostActions = {
  addNewPost: (_post: Post) => void
  setPosts: (_posts: Post[]) => void
}

export type PostStore = PostState & PostActions

export const defaultInitState: PostState = {
  posts: [],
}

export const createPostStore = (
  initState: PostState = defaultInitState,
) => {
  return createStore<PostStore>()((set) => ({
    ...initState,
    addNewPost: (_post: Post) =>{
      set((state) => ({
        posts: [...state.posts, _post],
      }))},
    setPosts: (_posts: Post[]) => {
      set((state) => ({
        posts: [...state.posts, ..._posts],
      }))
    }
  }))
}
