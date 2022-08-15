import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import {
  GetSectionsDocument,
  GetSectionsQuery,
} from "../client/generated/graphql";
import { apolloClient } from "../utils/apolloClient";

interface HomeProps {
  data: GetSectionsQuery;
}

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Greens Designs</title>
        <meta
          name="description"
          content="Greens Designs' Mission: We seek to create genuine spaces that showcase our design beliefs through our client's vision."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data.getSections.map((section) => (
        <div key={section.id}>{section.title}</div>
      ))}
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await apolloClient.query<GetSectionsQuery>({
    query: GetSectionsDocument,
  });

  return {
    props: {
      data: data.data,
    },
  };
};
