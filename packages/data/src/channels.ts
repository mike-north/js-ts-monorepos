import { IChannel, isChannel } from "@shlack/types";
import { apiCall } from "@shlack/utils";

const cachedChannelRecords: Record<string, Promise<IChannel>> = {};

export async function getChannelById(id: string): Promise<IChannel> {
  let cached = cachedChannelRecords[id];
  if (typeof cached !== "undefined") return await cached;
  cached = cachedChannelRecords[id] = apiCall(`Channels/${id}`).then(
    (rawData: unknown) => {
      if (isChannel(rawData)) return rawData;
      throw new Error(
        `Unexpected value for channel\n${JSON.stringify(rawData)}`
      );
    }
  );

  return await cached;
}
