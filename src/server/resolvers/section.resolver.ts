import {
  Arg,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root,
  Int,
} from "type-graphql";
import { prisma } from "../../utils/prisma";
import { Section } from "../schemas/section.schema";

@Resolver(Section)
export class SectionReslover {
  @Query(() => [Section])
  async getSections(): Promise<Section[]> {
    return await prisma.section.findMany();
  }

  @Mutation(() => Section)
  async addSection(
    @Arg("title") title: string,
    @Arg("coverImage") coverImage: string,
  ): Promise<Section> {
    const section = await prisma.section.create({
      data: {
        title,
        coverImage,
      },
    });

    return section;
  }

  @Mutation(() => Boolean)
  async deleteSection(
    @Arg("id", () => Int) id: number,
  ): Promise<boolean> {
    try {
      await prisma.section.delete({
        where: {
          id: id,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => Section)
  async updateSection(
    @Arg("id") id: string,
    @Arg("title") title: string,
    @Arg("coverImage") coverImage: string,
  ): Promise<Section> {
    const section = await prisma.section.update({
      where: {
        id: +id,
      },
      data: {
        title,
        coverImage,
      },
    });

    return section;
  }
}
