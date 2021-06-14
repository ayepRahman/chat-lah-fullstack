import { AuthenticationError } from "apollo-server-express";
import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import { JWT_SECRET } from "constants/env";
import jwt from "jsonwebtoken";
import { ContextProps } from "interfaces/ContextProps";
import { ErrorMessage } from "enums/ErrorMessage";

export class AuthorizedUser implements MiddlewareInterface<ContextProps> {
  async use({ context }: ResolverData<ContextProps>, next: NextFn) {
    try {
      const accessToken = context.req.headers.authorization || "";
      const tokenValue = accessToken.replace("Bearer ", "");
      jwt.verify(tokenValue, JWT_SECRET);
      return next();
    } catch (error) {
      throw new AuthenticationError(ErrorMessage.NOT_AUTHORIZED);
    }
  }
}
