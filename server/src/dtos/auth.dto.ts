import { Field, InputType } from "type-graphql";
import { Length, IsEmail } from "class-validator";

@InputType()
export class LoginInputDto {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @Length(6, 30)
  password: string;
}

@InputType()
export class RegisterUserInputDto {
  @Field(() => String)
  @Length(30, 255)
  username: string;

  @Field(() => String)
  @IsEmail({}, { message: "Invalid email format!" })
  email: string;

  @Field(() => String)
  @Length(6, 30)
  password: string;
}
