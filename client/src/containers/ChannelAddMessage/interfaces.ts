import { FieldNames } from "./enums";

export type FormData = {
  [FieldNames.TEXT]: string | { message: string };
};
