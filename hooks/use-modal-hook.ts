import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "members"
  | "editServer"
  | "createChannel"
  | "deleteServer"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel";
type ModalData = {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
};
type ModalStore = {
  type: ModalType | null;
  onClose: () => void;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
};
export const useModal = create<ModalStore>((set) => ({
  type: null,
  onClose: () => set({ type: null, isOpen: false }),
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
}));
