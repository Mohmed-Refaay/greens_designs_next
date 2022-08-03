import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Section {
  @Field(() => ID)
  id!: number;

  @Field(() => Date)
  createAt!: Date;

  @Field()
  title!: string;

  @Field()
  coverImage!: string;
}
