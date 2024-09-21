'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type PostStore, createPostStore } from '@/store/usePostStore'

export type PostStoreApi = ReturnType<typeof createPostStore>

export const PostStoreContext = createContext<PostStoreApi | undefined>(
  undefined,
)

export interface PostStoreProviderProps {
  children: ReactNode
}

export const PostStoreProvider = ({
  children,
}: PostStoreProviderProps) => {
  const storeRef = useRef<PostStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createPostStore()
  }

  return (
    <PostStoreContext.Provider value={storeRef.current}>
      {children}
    </PostStoreContext.Provider>
  )
}

export const usePostStore = <T,>(
  selector: (_store: PostStore) => T,
): T => {
  const postStoreContext = useContext(PostStoreContext)

  if (!postStoreContext) {
    throw new Error(`usePostStore must be used within PostStoreProvider`)
  }

  return useStore(postStoreContext, selector)
}
