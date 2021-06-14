import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types, ObjectIdScalar } from "graphql/scalars";
import { Message } from "models/message.model";

@ObjectType("Channel", {
  description: "Channel Schema",
})
export class Channel {
  @Field(() => ObjectIdScalar)
  @prop({ type: Types.ObjectId, auto: true })
  public _id?: Types.ObjectId;

  @Field(() => String)
  @prop({ type: String, required: true })
  public ownerId: string;

  @Field(() => String)
  @prop({ type: String, required: true })
  public name: string;

  @Field(() => String)
  @prop({ type: Boolean, required: true })
  public isPublic: boolean;

  @Field(() => [Message], { nullable: true })
  @prop({ type: [Message] })
  public messages?: Message[];
}

export const ChannelModel = getModelForClass(Channel); // UserModel is a regular Mongoose Model with correct types
