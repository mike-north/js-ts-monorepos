import { apiCall } from "@shlack/utils";
import { isTeam, isTypedArray, ITeam } from "@shlack/types";

let cachedAllTeamsList: Promise<ITeam[]>;
export async function getAllTeams(): Promise<ITeam[]> {
  if (typeof cachedAllTeamsList === "undefined")
    cachedAllTeamsList = apiCall("teams").then((rawData: unknown) => {
      if (isTypedArray(rawData, isTeam)) return rawData;
      throw new Error(
        `Unexpected value for teams array\n${JSON.stringify(rawData)}`
      );
    });

  return await cachedAllTeamsList;
}

const cachedTeamRecords: Record<string, Promise<ITeam>> = {};

export async function getTeamById(id: string): Promise<ITeam> {
  let cached = cachedTeamRecords[id];
  if (typeof cached === "undefined")
    cached = cachedTeamRecords[id] = apiCall(`teams/${id}`).then(
      (rawData: unknown) => {
        if (isTeam(rawData)) return rawData;
        throw new Error(
          `Unexpected value for team\n${JSON.stringify(rawData)}`
        );
      }
    );
  return await cached;
}
