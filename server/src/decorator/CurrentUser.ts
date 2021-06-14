import { AuthenticationError } from "apollo-server-express";
import { createParamDecorator } from "type-graphql";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "constants/env";
import { ContextProps } from "interfaces/ContextProps";
import { ErrorMessage } from "enums/ErrorMessage";

export function CurrentUser() {
  return createParamDecorator<ContextProps>(({ context }) => {
    const accessToken = context.req.headers.authorization || "";
    const tokenValue = accessToken.replace("Bearer ", "");
    const user = jwt.verify(tokenValue, JWT_SECRET);

    if (!user) {
      throw new AuthenticationError(ErrorMessage.NOT_AUTHORIZED);
    }

    return user;
  });
}
