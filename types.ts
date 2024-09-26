import { Member, Profile, Server } from "@prisma/client";
import { Socket } from "net";
import { Server as HTTPServer } from "http";

import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
export type ServerWithMembersandProfile = Server & {
  members: (Member & { profile: Profile })[];
};
export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: HTTPServer & {
      io: SocketIOServer;
    };
  };
};
