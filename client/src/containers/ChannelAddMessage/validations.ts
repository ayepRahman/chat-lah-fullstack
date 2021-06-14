import * as yup from "yup";
import { FieldNames } from "./enums";

export const validationSchema = yup.object().shape({
  [FieldNames.TEXT]: yup.string().required().max(200).label("Text"),
});
