import { gql } from "@apollo/client";

export const CHANNEL_ADD_MESSAGE = gql`
  mutation CHANNEL_ADD_MESSAGE($channelId: ObjectId!, $text: String!) {
    addChannelMessages(input: { channelId: $channelId, text: $text }) {
      result
    }
  }
`;
