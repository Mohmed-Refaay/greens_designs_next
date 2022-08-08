import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: number;

  @Field(() => Date)
  createAt!: Date;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(() => [Image])
  images!: Image[];
}

@ObjectType()
export class Image {
  @Field(() => ID)
  id!: number;

  @Field(() => Date)
  createAt!: Date;

  @Field()
  projectId!: number;

  @Field()
  url!: string;
}
