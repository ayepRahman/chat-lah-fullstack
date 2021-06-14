import { FieldNames } from "./enums";

export type FormData = {
  [FieldNames.USERNAME]: string | { message: string };
  [FieldNames.EMAIL]: string | { message: string };
  [FieldNames.PASSWORD]: string | { message: string };
  [FieldNames.CONFIRM_PASSWORD]: string | { message: string };
};

export interface RegisterData {
  login: {
    accessToken: string;
  };
}

export interface RegisterVar {
  input: {
    username: string;
    email: string;
    password: string;
  };
}
