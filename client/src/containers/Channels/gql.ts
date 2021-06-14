import { gql } from "@apollo/client";

export const GET_CHANNELS = gql`
  query GET_CHANNELS {
    channels {
      _id
      name
    }
  }
`;
