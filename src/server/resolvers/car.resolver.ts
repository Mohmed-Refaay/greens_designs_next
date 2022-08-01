import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { prisma } from "../../utils/prisma";
import { Car } from "../schemas/car.schema";

@InputType()
class carInput {
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

@Resolver(Car)
export class CarReslover {
  @Query(() => [Car])
  async getCars(): Promise<Car[]> {
    const cars = await prisma.car.findMany();

    return cars;
  }

  @Mutation(() => Car, { nullable: true })
  async addCar(
    @Arg("input", () => carInput) input: carInput,
  ): Promise<Car> {
    const car = await prisma.car.create({
      data: {
        ...input,
      },
    });
    return car;
  }
}
