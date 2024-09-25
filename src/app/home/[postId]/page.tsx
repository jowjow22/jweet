'use client'
import { Post } from "@/components/Post/Post"
import { useEffect, useState } from "react"
import { getPostById } from "@/services/posts"
import { Post as PostType } from "@/models/Post"
import { Progress } from "@/components/ui/progress"


export default function PostPage ({params}: { params: { postId: string } }){
  const { postId } = params
  const [post, setPost] = useState<PostType | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    setLoading(true)
    const interval = setInterval(() => {
      setProgress((prev) => prev + 13)
    }, 100)
    getPostById(postId).then((data: PostType) => {
      setPost(data)
      setLoading(false)
    })
    return () => clearInterval(interval)
  }, [postId])

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
      <Progress value={progress} className="w-[60%]" />
    </div>
    )
  }
  

  return (post ? <div className="w-full flex justify-center items-center px-4 pt-8 md:px-32"><Post post={post} /></div> : <div className="w-screen h-screen flex justify-center items-center"><h1>Post not found</h1></div>)
}
