import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function createTagArray(description: string) {
  const descArray = description.split(" ");
  const postTags: string[] = [];

  descArray.forEach((str: string) => {
    if (str.charAt(0) === "#") {
      const tag = str.slice(1);
      postTags.push(tag);
    }
  });

  return postTags;
}

async function createTag(name: string) {
  const foundTag = prisma.tags.findFirst({
    where: {
      name: name,
    },
  });
  if (!foundTag) {
    const newTag = prisma.tags.create({
      data: {
        name: name,
      },
    });

    return newTag;
  }
}

async function readAllTags() {
  const tags = prisma.tags.findMany();

  return tags;
}

async function readTagByName(name: string) {
  const tags = prisma.tags.findFirst({
    where: {
      name: name,
    },
  });

  return tags;
}

export { createTag, readAllTags, readTagByName, createTagArray };
