import { DiscordLogoIcon } from "@radix-ui/react-icons";

function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="mb-5">
        <DiscordLogoIcon className="animate-spin-slow delay-75  h-28 w-28	 " />
      </div>
      <h6 className="uppercase text-lg font-semibold">Loading...</h6>
    </div>
  );
}

export default LoadingPage;
