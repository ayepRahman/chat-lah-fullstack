import { ObjectType, Field, InputType } from "type-graphql";
import { Types, ObjectIdScalar } from "graphql/scalars";
import { Channel } from "models/channel.model";
import { PageInfoDto } from "dtos/pagination.dto";

@ObjectType()
export class BaseChannelDto extends Channel {}

@ObjectType()
export class PaginationChannelDto extends Channel {
  @Field(() => PageInfoDto)
  pageInfo: PageInfoDto;
}

@InputType()
export class CreateChannelInputDto {
  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  isPublic: boolean;
}

ObjectType();
export class CreateChannelDto {
  @Field(() => ObjectIdScalar)
  ownerId: Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  isPublic: boolean;
}

@InputType()
export class AddChannelMessageInputDto {
  @Field(() => ObjectIdScalar)
  channelId: Types.ObjectId;

  @Field(() => String)
  text: string;
}
