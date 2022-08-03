import "reflect-metadata";
import type {
  NextApiRequest,
  NextApiResponse,
  PageConfig,
} from "next";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { UserReslover } from "../../server/resolvers/user.resolver";
import { SectionReslover } from "../../server/resolvers/section.resolver";

const apolloServer = new ApolloServer({
  // csrfPrevention: true,
  schema: await buildSchema({
    resolvers: [UserReslover, SectionReslover],
  }),
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD",
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(
    req,
    res,
  );
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
