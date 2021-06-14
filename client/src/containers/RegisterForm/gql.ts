import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation REGISTER($input: RegisterUserInputDto!) {
    register(input: $input) {
      result
    }
  }
`;
