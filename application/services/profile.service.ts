import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function readAllProfiles() {
  const profiles = prisma.profile.findMany();

  return profiles;
}

async function readProfileById(id: number) {
  const foundProfile = prisma.profile.findUnique({
    where: {
      id: id,
    },
  });

  return foundProfile;
}

async function updateProfile(id: number, username: string, birthdate: number) {
  const birthdateString = birthdate.toString();

  const profile = prisma.profile.update({
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
//   const deletedProfile = prisma.profile.delete({
//     where: {
//       id: id,
//     },
//   });

  const deletedUser = prisma.user.delete({
    where: {
      id: id,
    },
  });

  return deletedUser;
}

export { readAllProfiles, readProfileById, updateProfile, deleteProfile };
