import { useEffect } from "react";
import Deferred from "./deferred";

/**
 * Fetches data from an API and then
 * updates a `useState` setter
 *
 * @param getData - callback that returns a promise which resolves to data
 * @param options - options having to do with `useState` and `useEffect`
 *
 * @example
 * An example of how to use this with `React.useState`
 * ```ts
 * const messages = React.useState<IMessage[]>();
 * useAsyncDataEffect(() => getChannelMessages(channel.teamId, channel.id), {
 *   setter: setMessages,
 *   stateName: "messages",
 *   otherStatesToMonitor: [channel],
 * });
 * ```
 */
export function useAsyncDataEffect<T>(
  getData: () => Promise<T>,
  options: {
    stateName: string;
    otherStatesToMonitor?: unknown[];
    setter: (arg: T) => void;
  }
): void {
  let cancelled = false;
  const { setter, stateName } = options;
  useEffect(() => {
    const d = new Deferred<T>();

    getData()
      .then((jsonData) => {
        if (cancelled) return;
        else d.resolve(jsonData);
      })
      .catch(d.reject);

    d.promise
      .then((data) => {
        if (!cancelled) {
          console.info(
            "%c Updating state: " + stateName,
            "background: green; color: white; display: block;"
          );
          setter(data);
        }
      })
      .catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [...(options.otherStatesToMonitor || []), stateName]);
}
