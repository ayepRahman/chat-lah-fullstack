import { gql } from "@apollo/client";

export const GOOGLE_LOGIN = gql`
  mutation GOOGLE_LOGIN($googleIdToken: String!) {
    googleLogin(googleIdToken: $googleIdToken) {
      _id
      username
      accessToken
      imgUrl
    }
  }
`;
