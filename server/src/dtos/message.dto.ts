import { Field, ObjectType } from "type-graphql";
import { Types, ObjectIdScalar } from "graphql/scalars";
import { BaseUserDto } from "./user.dto";

@ObjectType()
export class BaseMessageDto {
  @Field(() => ObjectIdScalar)
  public _id?: Types.ObjectId;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => String)
  public text: string;

  @Field(() => BaseUserDto)
  public user: BaseUserDto;
}

@ObjectType()
export class MessagePayload {
  @Field(() => ObjectIdScalar)
  public channelId?: Types.ObjectId;

  @Field(() => BaseMessageDto)
  message: BaseMessageDto;
}
