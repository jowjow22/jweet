import { createStore } from 'zustand/vanilla'
import { Post } from '@/models/Post'

export type PostState = {
  posts: Post[]
}

export type PostActions = {
  addNewPost: (_post: Post) => void
  removePost: (_postId: string) => void
  setPosts: (_posts: Post[]) => void
  updateRepostState: (_postId: string, _isReposted: boolean) => void
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
        posts: Array.from(new Map([...state.posts, ..._posts].map((post) => [post.id, post])).values()),
      }))
    },
    removePost: (_postId: string) => {
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== _postId),
      }))
    },
    updateRepostState: (_postId: string, _isReposted: boolean) => {
      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === _postId) {
            return {
              ...post,
              reposted: _isReposted,
            }
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
