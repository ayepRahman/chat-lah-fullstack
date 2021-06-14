export interface GetUserData {
  currentUser: {
    _id: string;
  };
}

export interface MessageProp {
  _id: string;
  createdAt: Date;
  text: string;
  user: {
    _id: string;
    username: string;
    imgUrl: string;
  };
}

export interface GetChannelByIdData {
  channel?: {
    _id: string;
    messages: MessageProp[];
    pageInfo: {
      hasNext: boolean;
    };
  };
}

export interface GetChannelByIdVar {
  channelId: string;
  paginationInput?: {
    limit?: number;
    skip?: number;
  };
}

export interface NewChannelMessageData {
  newMessage: MessageProp;
}
