import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
async function currentprofile() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });
  return profile;
}

export { currentprofile };
