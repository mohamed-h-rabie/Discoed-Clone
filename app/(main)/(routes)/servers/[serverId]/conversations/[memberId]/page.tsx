import ChatHeader from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentprofile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface MemberIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  };
}
export default async function page({ params }: MemberIdPageProps) {
  const profile = await currentprofile();
  if (!profile) {
    return redirectToSignIn();
  }
  const curentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });
  if (!curentMember) {
    redirect("/");
  }
  const conversation = await getOrCreateConversation(
    curentMember?.id,
    params?.memberId
  );
  if (!conversation) {
    redirect(`/servers/${params?.serverId}`);
  }
  const { memberTwo, memberOne } = conversation;
  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col w-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        serverId={params.serverId}
        type="conversation"
        name={otherMember?.profile?.name}
      />
    </div>
  );
}
