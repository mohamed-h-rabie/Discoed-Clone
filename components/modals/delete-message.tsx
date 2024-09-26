"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-hook";
import { Button } from "../ui/button";

import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import queryString from "query-string";

export function DeleteMessageModal() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, type, onClose, data, onOpen } = useModal();
  const isOpenModal = isOpen && type === "deleteMessage";
  const { apiUrl, query } = data;

  const onDeleteServer = async () => {
    try {
      setIsLoading(true);
      const url = queryString.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.delete(url);

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-base font-semibold text-zinc-500 text-center">
            Do You Really want to Delete ? it will be deleted permanently
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className=" bg-gray-100 px-6 py-4">
          <div className="flex justify-between items-center w-full">
            <Button variant="ghost" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => onDeleteServer()}
              variant="primary"
              className="w-20"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
