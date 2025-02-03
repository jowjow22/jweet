import { Post } from "@/models/Post";
import { prisma as database } from "../database";

class PostRepository {
  async listByUser(userId: string): Promise<Post[]> {
    const posts = await database.post.findMany({
      include: {
        childPost: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                email: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            likes: {
              where: {
                userId: userId
              },
              select: {
                id: true,
                userId: true,
                postId: true,
                createdAt: true,
              }
            },
            _count: {
              select: {
                likes: true,
              },
            },
          },
        },
        parentPost: {
            where: {
              userId: userId,
            },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        likes: {
          where: {
            userId: userId
          },
          select: {
            id: true,
            userId: true,
            postId: true,
            createdAt: true,
          }
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  }

  async find(postId: string){
    const post = await database.post.findFirst({
      where: {
        id: postId
      }
    });

    return post
  }

  async removeParentPost(post: Post){
    if (!post.childPostId) {
      return;
    }

    await database.post.update({
      where: {
        id: post.childPostId
      },
      data: {
        parentPostId: null
      }
    });
  }

  async delete(postId: string){
    await database.post.delete({
      where: {
        id: postId
      }
    });
  }

  async findWithFullInfo(postId: string, userId: string){
    const post = await database.post.findFirst({
      include: {
        childPost: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            _count: {
              select: {
                likes: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        likes: {
         where: {
            userId: userId
          }
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        id: postId
      }
    });

    return post;
  }
}

const instance = new PostRepository();

Object.freeze(instance);

export default instance;