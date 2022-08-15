import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://greens-design.vercel.app/api/graphql",

  credentials: "include",
  cache: new InMemoryCache(),
});
