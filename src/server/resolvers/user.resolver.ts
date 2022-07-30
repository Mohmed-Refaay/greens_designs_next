import { Query, Resolver } from "type-graphql";
import { User } from "../schemas/user.schema";

@Resolver(User)
export class UserReslover {
  @Query(() => [User])
  getUsers(): User[] {
    return [
      { id: 1, full_name: "Refaay", email: "ref@gmail.com" },
      { id: 2, full_name: "Ahmed Maher", email: "maher@gmail.com" },
      { id: 3, full_name: "Abdo", email: "joker@gmail.com" },
    ];
  }
}
