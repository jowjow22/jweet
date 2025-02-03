import { prisma as database } from "../database";

class LikeRepository {
  async deleteMany(postId: string) {
      await database.like.deleteMany({
        where: {
          postId: postId
        }
      });
  }
}

const instance = new LikeRepository();

Object.freeze(instance);

export default instance;