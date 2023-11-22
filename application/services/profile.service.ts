import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function readAllProfiles() {
  const profiles = prisma.profiles.findMany();

  return profiles;
}

async function readProfileById(id: number) {
  const foundProfile = prisma.profiles.findUnique({
    where: {
      id: id,
    },
  });

  return foundProfile;
}

async function updateProfile(id: number, username: string, birthdate: number) {
  const birthdateString = birthdate.toString();

  const profile = prisma.profiles.update({
    where: {
      id: id,
    },
    data: {
      username: username,
      birthdate: birthdateString,
    },
  });

  return profile;
}

async function deleteProfile(id: number) {
  //   const deletedProfile = prisma.profiles.delete({
  //     where: {
  //       id: id,
  //     },
  //   });

  const deletedUser = prisma.profiles.delete({
    where: {
      id: id,
    },
  });

  return deletedUser;
}

async function findProfileByUsername(username: string) {
  const foundProfile = prisma.profiles.findFirst({
    where: {
      username: username,
    },
  });

  return foundProfile;
}

async function getFirstFiveProfiles() {
  const profiles = prisma.profiles.findMany({
    skip: 0,
    take: 5,
  });

  return profiles;
}

export {
  readAllProfiles,
  readProfileById,
  updateProfile,
  deleteProfile,
  findProfileByUsername,
  getFirstFiveProfiles,
};
