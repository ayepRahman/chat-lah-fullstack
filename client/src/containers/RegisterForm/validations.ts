/*
 * VALIDATIONS
 * Object schema validation
 * @see https://github.com/jquense/yup
 */

import * as yup from "yup";
import { FieldNames } from "./enums";

export const validationSchema = yup.object().shape({
  [FieldNames.USERNAME]: yup
    .string()
    .min(4)
    .max(20)
    .required()
    .label("Username"),
  [FieldNames.EMAIL]: yup.string().email().required().label("Email"),
  [FieldNames.PASSWORD]: yup
    .string()
    .min(4)
    .max(30)
    .required()
    .label("Password"),
  [FieldNames.CONFIRM_PASSWORD]: yup
    .string()
    .min(4)
    .max(30)
    .required()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .label("Confirm Password"),
});
