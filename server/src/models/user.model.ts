/*
 * @see
 * https://mongoosejs.com/docs/guide.html#definition
 * https://mongoosejs.com/docs/schematypes.html#what-is-a-schema-type
 */

import { ObjectType, Field } from "type-graphql";
import { Types, ObjectIdScalar } from "graphql/scalars";
import { prop, pre, getModelForClass } from "@typegoose/typegoose";
import { hash } from "bcryptjs";
import isEmail from "validator/lib/isEmail";

// Pre save hook to hash and store password
@pre<User>("save", async function hashPassword() {
  if (this.isModified("password") && this.password) {
    this.password = await hash(this.password, 12);
  }
})
@ObjectType("User", {
  description: "Some description about user",
})
export class User {
  // adding _id here due to type issue
  @Field(() => ObjectIdScalar)
  @prop({ type: Types.ObjectId, auto: true })
  public _id?: Types.ObjectId;

  @Field(() => Date)
  @prop({ type: Date, required: true })
  public createdAt: Date;

  @Field(() => String)
  @prop({ type: String, required: true, minlength: 4, maxlength: 20 })
  public username: string;

  @Field(() => String)
  @prop({
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
    validate: {
      validator: isEmail,
      message: "Invalid email format.",
    },
  })
  public email: string;

  @Field(() => String)
  @prop({ type: String, minlength: 4, maxlength: 20 })
  public password: string;

  @Field(() => String, { nullable: true })
  @prop({ type: String })
  public imgUrl?: string;
}

export const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types
