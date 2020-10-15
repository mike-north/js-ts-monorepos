/**
 * A user participating in a chat
 * @public
 */
export interface IUser {
  id: number;
  username: string;
  name: string;
  iconUrl: string;
}

/**
 * A chat message
 * @public
 */
export interface IMessage {
  id: number;
  teamId: string;
  channelId: string;
  userId: string;
  createdAt: string;
  user: IUser;
  body: string;
}

/**
 * A team, containing one or more chat channels
 * @public
 *
 * @remarks
 * The {@link @shlack/types#isTeam} type guard may be used to
 * detect whether a value conforms to this interface
 */
export interface ITeam {
  iconUrl: string;
  name: string;
  id: string;
  channels: IChannel[];
}

/**
 * A chat channel, containing many chat messages
 * @public
 */
export interface IChannel {
  teamId: string;
  name: string;
  description: string;
  id: string;
  messages: IMessage[];
}
