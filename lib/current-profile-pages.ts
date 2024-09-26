import { auth, getAuth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextApiRequest } from "next";
async function currentprofilePages(req: NextApiRequest) {
  const { userId } = getAuth(req);
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

export { currentprofilePages };
