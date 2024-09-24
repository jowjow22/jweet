import { createStore } from 'zustand/vanilla'
import { Post } from '@/models/Post'

export type PostState = {
  posts: Post[]
}

export type PostActions = {
  addNewPost: (_post: Post) => void
  setPosts: (_posts: Post[]) => void
  updatePostLikes: (_postId: string, _add: boolean) => void
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
        posts: [_post,...state.posts],
      }))},
    setPosts: (_posts: Post[]) => {
      set((state) => ({
        posts: [...state.posts, ..._posts],
      }))
    },
    updatePostLikes: (_postId: string, _add: boolean) => {
      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === _postId) {
            return {
              ...post,
              _count: {
                likes: _add ? post._count.likes + 1 : post._count.likes - 1,
              }
            }
          }
          return post
        }),
      }))
    },
  }))
}
