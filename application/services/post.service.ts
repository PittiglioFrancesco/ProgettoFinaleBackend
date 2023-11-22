import { PrismaClient } from "@prisma/client";
import { createTag, createTagArray } from "./tag.service";
import { createPostTag } from "./posttag.service";

const prisma = new PrismaClient();

async function createPost(
  profileId: number,
  createdAt: string,
  description: string
) {
  const newPost = await prisma.posts.create({
    data: {
      description: description,
      createdAt: createdAt,
      profileId: profileId,
    },
  });

  const postTags = createTagArray(description);

  postTags.forEach((tag) => {
    createTag(tag as string);
    createPostTag(newPost?.id, tag)
  });

  return newPost;
}

async function readAllPosts() {
  const posts = prisma.posts.findMany();

  return posts;
}

async function readPostById(id: number) {
  const foundPost = prisma.posts.findUnique({
    where: {
      id: id,
    },
  });

  return foundPost;
}

async function readAllPostsOfProfile(id: number) {
  const foundPost = prisma.posts.findMany({
    where: {
      profileId: id,
    },
  });

  return foundPost;
}

async function updatePost(id: number, description: string) {
  // aggiungere update tag
  const post = prisma.posts.update({
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
  const deletedPost = prisma.posts.delete({
    where: {
      id: id
    },
  });

  return deletedPost;
}

export { createPost, readAllPosts, readPostById, readAllPostsOfProfile, updatePost, deletePost };
