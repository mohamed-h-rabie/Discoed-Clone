import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
interface Props {
  endpoint: "messageFile" | "serverImage";
  onChange: (file: string) => void;
  value: string;
}
export default function FileUpload({ endpoint, onChange, value }: Props) {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          quality={100}
          src={value}
          alt="Uploaded Image"
          className="rounded-full"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-[2px] shadow-sm top-0 right-0 absolute rounded-full "
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadButton
      appearance={{
        button: "ut-ready:bg-indigo-500 ut-uploading:cursor-not-allowed   ",
      }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        console.log(error.message);

        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
