import { MemberRole } from "@prisma/client";
import { currentprofile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentprofile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();
    const serverid = searchParams.get("serverId");
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverid) {
      return new NextResponse("server ID is required", { status: 400 });
    }
    if (!params.memberId) {
      return new NextResponse("Member ID is required", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverid,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internet Error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentprofile();
    const { searchParams } = new URL(req.url);

    const serverid = searchParams.get("serverId");
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverid) {
      return new NextResponse("server ID is required", { status: 400 });
    }
    if (!params.memberId) {
      return new NextResponse("Member ID is required", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverid,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internet Error", { status: 500 });
  }
}
