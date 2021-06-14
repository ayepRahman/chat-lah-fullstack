import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation LOGIN($input: LoginInputDto!) {
    login(input: $input) {
      accessToken
    }
  }
`;
