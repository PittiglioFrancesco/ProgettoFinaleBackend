import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function login(email: string, password: string) {
  const foundUser = await prisma.users.findUnique({
    where: {
      email: email,
      password: password,
    },
  });
  return foundUser;
}

async function register(
  username: string,
  email: string,
  password: string,
  birthdate: number
) {
  const birthdateString = birthdate.toString();
  const newProfile = await prisma.users.create({
    data: {
      email: email,
      password: password,
      profiles: {
        create: {
          username: username,
          birthdate: birthdateString
        }
      }
    }
  })

  return newProfile;
}

export { register, login };
