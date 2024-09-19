"use client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-hook";
import { ChannelType } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import queryString from "query-string";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required.",
    })
    .refine((name) => name !== "general", {
      message: 'Channel name Cannot be "general"',
    }),
  type: z.nativeEnum(ChannelType),
});

export function EditChannelModal() {
  const router = useRouter();
  //another way to get serverId
  // const params = useParams();
  // const serverId = params.serverId;
  // console.log(serverId);

  const { isOpen, type, onClose, data, onOpen } = useModal();
  const isOpenModal = isOpen && type === "editChannel";
  const { server, channelType, channel } = data;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channelType || ChannelType?.TEXT,
    },
  });
  const isLoading = form.formState.isSubmitting;
  useEffect(() => {
    if (channel) {
      form.setValue("name", channel?.name);
      form.setValue("type", channel?.type);
    }
  }, [channel, form]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const url = queryString.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      const res = await axios.patch(url, values);
      console.log(res);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  }
  const handleClose = () => {
    form.reset();
    onClose();
  };
  return (
    <Dialog open={isOpenModal} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500
                  dark:text-secondary/70"
                    >
                      serverName
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0
                    focus-visible:ring-0
                    text-black focus-visible:ring-offset-0
                    "
                        placeholder="Enter your server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500
                  dark:text-secondary/70"
                    >
                      Channel Type
                    </FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-zinc-300/50 border-0
                              focus:ring-0
                   text-black focus:ring-offset-0
                                outline-none
                                capitalize
                                ring-offset-0
                                          "
                        >
                          <SelectValue placeholder="select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((value) => (
                          <SelectItem
                            key={value}
                            value={value}
                            className="capitalize"
                          >
                            {value.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-8">
              <Button
                disabled={isLoading}
                variant="primary"
                type="submit"
                className="w-20"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
