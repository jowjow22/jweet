import service from './axiosConfig'
import { Post, postSchema } from '@/models/Post';

export const getPosts = async () => {
  try {
    const response = await service.get('/posts');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPost = async (post: Post) => {
  try {
    const newPost = postSchema.parse(post);
    const response = await service.post('/posts', newPost);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};