import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    currentUser {
      _id
      email
      username
      imgUrl
    }
  }
`;
