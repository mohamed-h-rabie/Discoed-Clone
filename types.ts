import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersandProfile = Server & {
  members: (Member & { profile: Profile })[];
};
