"use client";

import { useEffect, useState } from "react";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "../modals/invite-modal";
import { EditServerModal } from "../modals/edit-server-modal";
import { ManageMembersModal } from "../modals/manage-members";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { LeaveServer } from "../modals/leave-server";
import { DeleteServer } from "../modals/delete-server";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <LeaveServer />
      <DeleteServer />
    </>
  );
};
