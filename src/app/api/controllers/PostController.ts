import { Post } from '@/models/Post';
import PostRepository from '../repositories/PostRepository';
import LikeRepository from '../repositories/LikeRepository';
import { NextResponse } from 'next/server';

class PostController {
  async listByUser(userId: string): Promise<Post[]> {
    const posts = await PostRepository.listByUser(userId);

    posts.forEach(post => {
      const reposted = !!post.parentPostId
      const liked = post.likes.length > 0
      Object.assign(post, { liked })
      Object.assign(post, { reposted })
    })

    console.log(posts)

    return posts;
  }

  async delete(userId: string, postId:string){
      const post = await PostRepository.find(postId);
    
     if (post === null) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
      }
    
      if (post.userId !== userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
      }

      if (post.childPostId !== null) {
        await PostRepository.removeParentPost(post as unknown as Post);
      }

      await LikeRepository.deleteMany(postId);
      await PostRepository.delete(postId);

      return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  }

  async findWithFullInfo({ params }: { params: { userId: string, postId: string } }){
    const { userId, postId } = params
    const post = await PostRepository.findWithFullInfo(postId, userId);

    if (post !== null) {
      const liked = post.likes.length > 0
      Object.assign(post, { liked })

      return NextResponse.json(post, { status: 200 });
    }

    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
}

const instance = new PostController();

Object.freeze(instance);

export default instance;