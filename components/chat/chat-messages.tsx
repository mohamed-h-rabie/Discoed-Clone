"use client";
import { Member, Message, Profile } from "@prisma/client";
import { Fragment } from "react";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { ServerCrash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatItem } from "./chat-item";
import { format } from "date-fns";
const DATE_FORMT = "d MM yyyy ,HH:mm";
interface ChatMessagesProps {
  name: string;
  member: Member;
  type: "channel" | "conversation";
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, any>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}
type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};
export const ChatMessages = ({
  name,
  member,
  type,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue });
  const renderSkeletons = Array(8)
    .fill(0)
    .map((_, idx) => (
      <div key={idx} className="flex flex-1 space-x-4 ml-2 p-4 mt-3">
        <Skeleton className="h-12 w-12 rounded-full dark:bg-[#4b4c51] bg-[#EFEFEF] " />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] dark:bg-[#4b4c51] bg-[#D7D7D8]" />
          <Skeleton className="h-4 w-[200px] dark:bg-[#4b4c51] bg-[#DDDDDE]" />
        </div>
        <div />
      </div>
    ));
  if (status === "pending") {
    return (
      <div className="mt-3 mb-auto flex-1">
        <ChatWelcome name={name} type={type} />
        <div className="flex flex-1 space-x-4 ml-2 p-4 mt-3">
          <Skeleton className="h-12 w-12 rounded-full dark:bg-[#4b4c51] bg-[#EFEFEF] " />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px] dark:bg-[#4b4c51] bg-[#DDDDDE]" />

            <Skeleton
              className="relative border mt-2 flex items-center rounded-md overflow-hidden  aspect-square 
              w-48 h-48 dark:bg-[#4b4c51] bg-[#DDDDDE]"
            />
          </div>
          <div />
        </div>
        {renderSkeletons}
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="w-14 h-14 mb-5 text-zinc-500 " />
        <p className="text-zinc-500 text-xl   dark:text-zinc-400">
          {" "}
          Something Went Wrong
        </p>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome name={name} type={type} />
      <div className=" flex flex-col-reverse mt-auto ">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group?.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                id={message.id}
                key={message.id}
                content={message.content}
                fileUrl={message.fileUrl}
                member={message.member}
                currentMember={member}
                timestamp={format(message.createdAt, DATE_FORMT)}
                deleted={message.deleted}
                isUpdated={message.createdAt !== message.updatedAt}
                socketQuery={socketQuery}
                socketUrl={socketUrl}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
