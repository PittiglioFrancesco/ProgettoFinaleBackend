import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function login(email: string, password: string) {
  const foundUser = await prisma.user.findUnique({
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
  const newProfile = await prisma.profile.create({
    data: {
      username: username,
      birthdate: birthdateString,
      user: {
        create: {
          email: email,
          password: password,
        },
      },
    },
  });

  return newProfile;
}

export { register, login };
