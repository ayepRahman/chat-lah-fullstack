import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    currentUser {
      _id
    }
  }
`;

export const GET_CHANNEL_BY_ID = gql`
  query GET_CHANNEL_BY_ID(
    $channelId: ObjectId!
    $paginationInput: PaginationInputDto
  ) {
    channel(channelId: $channelId, paginationInput: $paginationInput) {
      _id
      messages {
        _id
        createdAt
        text
        user {
          _id
          username
          imgUrl
        }
      }
      pageInfo {
        hasNext
      }
    }
  }
`;

export const NEW_CHANNEL_MESSAGE_SUB = gql`
  subscription NEW_CHANNEL_MESSAGE_SUB($channelId: ObjectId!) {
    newMessage(channelId: $channelId) {
      _id
      createdAt
      text
      user {
        _id
        username
        imgUrl
      }
    }
  }
`;
