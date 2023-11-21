import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createTag(name: string) {
  const newTag = prisma.tag.create({
    data: {
      name: name,
    },
  });

  return newTag;
}

export { createTag };
