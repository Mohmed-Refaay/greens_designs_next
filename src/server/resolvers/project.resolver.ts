import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Project } from "../schemas/project.schema";
import { prisma } from "../../utils/prisma";
import { Image } from "../schemas/project.schema";

@InputType()
class ImageInput {
  @Field()
  url!: string;
}

@Resolver(Project)
export class ProjectReslover {
  @Query(() => [Project])
  async getProjects(): Promise<Project[]> {
    return await prisma.project.findMany({
      include: {
        images: true,
      },
    });
  }

  @Mutation(() => Project)
  async addProject(
    @Arg("content") content: string,
    @Arg("title") title: string,
    @Arg("sectionId") sectionId: number,
  ): Promise<Project> {
    const data = await prisma.project.create({
      data: {
        content,
        title,
        sectionId,
      },
      include: {
        images: true,
      },
    });
    return data;
  }

  @Mutation(() => Project)
  async updateProject(
    @Arg("id") id: number,
    @Arg("content") content: string,
    @Arg("title") title: string,
    @Arg("sectionId") sectionId: number,
  ): Promise<Project> {
    const data = await prisma.project.update({
      where: {
        id,
      },
      data: {
        content,
        title,
        sectionId,
      },
      include: {
        images: true,
      },
    });
    return data;
  }

  @Mutation(() => Boolean)
  async addProjectImage(
    @Arg("url") url: string,
    @Arg("projectId") projectId: number,
  ): Promise<boolean> {
    try {
      await prisma.image.create({
        data: {
          projectId,
          url,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteProjectImage(@Arg("id") id: number): Promise<boolean> {
    try {
      await prisma.image.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
