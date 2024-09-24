import service from './axiosConfig'
import { PostCreation, postCreationSchema } from '@/models/Post';

export const getPosts = async () => {
  try {
    const response = await service.get('/posts');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPost = async (post: PostCreation) => {
  try {
    const newPost = postCreationSchema.parse(post);
    const response = await service.post('/posts', newPost);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addLike = async (userId: string, postId: string) => {
  try {
    const response = await service.post(`/posts/${userId}/like/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const removeLike = async (userId: string, postId: string) => { 
  try {
    const response = await service.delete(`/posts/${userId}/like/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const verifyUserLikedPost = async (userId: string, postId: string) => {
  try {
    const response = await service.get(`/posts/${userId}/like/${postId}`);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}