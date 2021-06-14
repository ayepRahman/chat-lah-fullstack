import { scalarsMap } from "graphql/scalars";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "resolvers/auth.resolver";
import { ChannelResolver } from "resolvers/channel.resolver";
import { UserResolver } from "resolvers/user.resolver";

export const getSchema = async () =>
  await buildSchema({
    resolvers: [AuthResolver, UserResolver, ChannelResolver],
    emitSchemaFile: true,
    validate: false,
    scalarsMap,
  });
