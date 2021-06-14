/*
 * VALIDATIONS
 * Object schema validation
 * @see https://github.com/jquense/yup
 */

import * as yup from "yup";
import { FieldNames } from "./enums";

export const validationSchema = yup.object().shape({
  [FieldNames.EMAIL]: yup.string().email().required().label("Email"),
  [FieldNames.PASSWORD]: yup
    .string()
    .min(4)
    .max(30)
    .required()
    .label("Password"),
});
