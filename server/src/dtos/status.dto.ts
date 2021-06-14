// https://typegraphql.com/docs/0.16.0/enums.html
import { ObjectType, Field, registerEnumType } from "type-graphql";
import { ResponseStatusEnum } from "enums/ResponseStatusEnum";

@ObjectType()
export class ResponseStatus {
  @Field(() => ResponseStatusEnum)
  result: ResponseStatusEnum;
}

registerEnumType(ResponseStatusEnum, {
  name: "ResponseStatusEnum", // this one is mandatory
  description: "A Status resposne of Success, Failure, Unknown Error", // this one is optional
});
