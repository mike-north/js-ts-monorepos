import { isMessage, isTypedArray, IMessage } from "@shlack/types";
import { apiCall } from "@shlack/utils";

const cachedMessageRecordArrays: Record<string, Promise<IMessage[]>> = {};

export async function getChannelMessages(
  teamId: string,
  channelId: string
): Promise<IMessage[]> {
  let cached = cachedMessageRecordArrays[channelId];
  if (typeof cached === "undefined")
    cached = cachedMessageRecordArrays[channelId] = apiCall(
      `teams/${teamId}/channels/${channelId}/messages`
    ).then((rawData) => {
      debugger;
      if (isTypedArray(rawData, isMessage)) {
        return rawData;
      } else
        throw new Error(
          `Unexpected value for message array\n${JSON.stringify(rawData)}`
        );
    });
  return await cached;
}
