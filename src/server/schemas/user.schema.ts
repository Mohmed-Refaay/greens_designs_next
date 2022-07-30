import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number;

  @Field()
  full_name!: string;

  @Field()
  email!: string;
}
