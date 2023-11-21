import { PrismaClient, tags } from "@prisma/client";

const prisma = new PrismaClient();

async function createPostTag(postId: number, tagName: string) {
  const foundTag = await prisma.tags.findFirst({
    where: {
      name: tagName,
    },
  });

  await prisma.posttag.create({
    data: {
        postId: postId,
        tagId: foundTag?.id as number
    }
  })
}

export { createPostTag }