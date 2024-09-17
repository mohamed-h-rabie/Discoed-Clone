import { currentprofile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Server } from "@prisma/client";
import { profile } from "console";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentprofile();
    if (!profile?.id) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("ServerId is Required", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(error);

    return new NextResponse("internal server error", { status: 500 });
  }
}
