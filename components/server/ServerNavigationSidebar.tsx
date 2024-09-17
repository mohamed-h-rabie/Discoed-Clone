import { currentprofile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./ServerHeader";
import ServerSearch from "./server-search";
import {
  Hash,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Video,
  Volume2,
} from "lucide-react";
import { Separator } from "../ui/separator";
import ServerSection from "./server-section";
import { channel } from "diagnostics_channel";
import ServerChannel from "./server-channel";
import ServerMember from "./server-member";
import { ScrollArea } from "../ui/scroll-area";

const IconMap = {
  [ChannelType.TEXT]: <Hash className="w-4 h-4 mr-2" />,
  [ChannelType.AUDIO]: <Volume2 className="w-4 h-4 mr-2" />,
  [ChannelType.VIDEO]: <Video className="w-4 h-4 mr-2" />,
};
export const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 mr-2 text-rose-500" />,
};
export async function ServerNavigationSidebar({
  serverId,
}: {
  serverId: string;
}) {
  const profile = await currentprofile();
  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "TextChannel",
                type: "channels",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "AudioChannel",
                type: "channels",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "VideoChannel",
                type: "channels",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "members",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Text channels"
              role={role}
              sectionType="channels"
              channelType={ChannelType.TEXT}
            />

            <div className="space-y-[2px]">
              {textChannels?.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  server={server}
                  channel={channel}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Voice channels"
              role={role}
              sectionType="channels"
              channelType={ChannelType.AUDIO}
            />

            <div className="space-y-[2px]">
              {audioChannels?.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  server={server}
                  channel={channel}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Voice channels"
              role={role}
              sectionType="channels"
              channelType={ChannelType.AUDIO}
            />

            <div className="space-y-[2px]">
              {videoChannels?.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  server={server}
                  channel={channel}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              label="Mmebers"
              role={role}
              sectionType="members"
              server={server}
            />

            <div className="space-y-[2px]">
              {members?.map((member) => (
                <ServerMember key={member.id} server={server} member={member} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
