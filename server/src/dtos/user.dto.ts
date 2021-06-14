import { Field, ObjectType } from "type-graphql";
import { Types, ObjectIdScalar } from "graphql/scalars";

@ObjectType()
export class BaseUserDto {
  @Field(() => ObjectIdScalar)
  _id?: Types.ObjectId;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  imgUrl?: string;
}

@ObjectType()
export class CurrentUserDto {
  @Field(() => ObjectIdScalar)
  _id: Types.ObjectId;

  @Field(() => Number)
  iat: number;
}

@ObjectType()
export class LoggedInUserDto extends BaseUserDto {
  @Field(() => String)
  accessToken: string;
}

ObjectType();
export class CreateUserDto {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  imgUrl?: string;

  @Field(() => String, { nullable: true })
  password?: string;
}

export class FindOrCreateUserDto extends CreateUserDto {}
