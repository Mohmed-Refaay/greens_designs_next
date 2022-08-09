import { Field, ID, ObjectType } from "type-graphql";
import { Section } from "./section.schema";

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

  @Field(() => Section)
  section!: Section;
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
