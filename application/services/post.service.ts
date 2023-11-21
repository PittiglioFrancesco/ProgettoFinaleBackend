import { PrismaClient } from "@prisma/client";
import { createTag } from "./tag.service";

const prisma = new PrismaClient();

async function createPost(
  profileId: number,
  createdAt: string,
  description: string
) {
  //   const createdAtString = createdAt.toString();

  const descArray = description.split(" ");
  const postTags: string[] = [];

  descArray.forEach((str: string) => {
    if (str.charAt(0) === "#") {
      const tag = str.slice(1);
      postTags.push(tag);
    }
  });

  postTags.forEach((tag) => {
    createTag(tag as string);
  });


  const newPost = await prisma.post.create({
    data: {
      description: description,
      createdAt: createdAt,
      profile: {
        connect: { userId: profileId },
      },
    },
  });

  return newPost;
}

async function readAllPosts() {
  const posts = prisma.post.findMany();

  return posts;
}

async function readPostById(id: number) {
  const foundPost = prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  return foundPost;
}

async function updatePost(id: number, description: string) {
  // aggiungere update tag
  const post = prisma.post.update({
    where: {
      id: id,
    },
    data: {
      description: description,
    },
  });

  return post;
}

async function deletePost(id: number) {
  const deletedPost = prisma.post.delete({
    where: {
      id: id,
    },
  });

  return deletedPost;
}

export { createPost, readAllPosts, readPostById, updatePost, deletePost };
