import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class PageInfoDto {
  @Field(() => Boolean)
  hasNext: boolean;
}

@InputType()
export class PaginationInputDto {
  @Field(() => Number, { nullable: true })
  limit?: number;

  @Field(() => Number, { nullable: true })
  skip?: number;
}
