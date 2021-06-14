import { FieldNames } from "./enums";

export type FormData = {
  [FieldNames.EMAIL]: string | { message: string };
  [FieldNames.PASSWORD]: string | { message: string };
};

export interface LoginData {
  login: {
    accessToken: string;
  };
}

export interface LoginVar {
  input: {
    email: string;
    password: string;
  };
}
