import { createStore } from 'zustand/vanilla'
import { Post } from '@/models/Post'

export type PostState = {
  posts: Post[]
}

export type PostActions = {
  addNewPost: (_post: Post) => void
  removePost: (_postId: string) => void
  setPosts: (_posts: Post[]) => void
  updatePostLikes: (_postId: string, _add: boolean) => void
  updatePostObject: (_post: Post) => void
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
        posts: Array.from(new Map([...state.posts, ..._posts].map((post) => [post.id, post])).values()),
      }))
    },
    removePost: (_postId: string) => {
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== _postId),
      }))
    },
    updatePostObject: (_post: Post) => {
      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === _post.id) {
            return _post
          }
          return post
        }),
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
