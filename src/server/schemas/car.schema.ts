import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Car {
  @Field(() => ID)
  id!: number;

  @Field(() => Date)
  createAt!: Date;

  @Field()
  name!: string;

  @Field()
  model!: string;

  @Field()
  topSpeed!: string;

  @Field()
  color!: string;

  @Field()
  coverImage!: string;
}
