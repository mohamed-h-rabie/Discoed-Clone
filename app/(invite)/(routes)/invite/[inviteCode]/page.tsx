import { currentprofile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: { inviteCode: string };
}) {
  const profile = await currentprofile();
  if (!profile) {
    return redirectToSignIn();
  }
  if (!params.inviteCode) {
    redirect("/");
  }
  const exsitingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (exsitingServer) {
    return redirect(`/servers/${exsitingServer.id}`);
  }
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return null;
}
