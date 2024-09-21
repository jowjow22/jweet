import { createStore } from 'zustand/vanilla'
import { Post } from '@/models/Post'

export type PostState = {
  posts: Post[]
}

export type PostActions = {
  addNewPost: (_post: Post) => void
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
  }))
}
