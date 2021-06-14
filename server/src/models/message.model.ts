import { ObjectType, Field } from "type-graphql";
import { Types, ObjectIdScalar } from "graphql/scalars";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { User } from "models/user.model";

@ObjectType("Message", {
  description: "Message Schema",
})
export class Message {
  @Field(() => ObjectIdScalar)
  @prop({ type: Types.ObjectId, auto: true })
  public _id?: Types.ObjectId;

  @Field(() => Date)
  @prop({ type: Date, required: true })
  public createdAt: Date;

  @Field(() => String)
  @prop({ type: String, required: true })
  public text: string;

  @Field(() => User)
  @prop({ type: User, required: true })
  public user: User;
}

export const MessageModel = getModelForClass(Message); // UserModel is a regular Mongoose Model with correct types
