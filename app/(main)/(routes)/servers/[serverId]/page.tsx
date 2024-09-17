import React from "react";

export default function ServerIdPage({
  params,
}: {
  params: { serverId: string };
}) {
  console.log(params.serverId);

  return <div>{params.serverId}</div>;
}
