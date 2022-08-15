import { ApolloQueryResult } from "@apollo/client/core/types";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  GetSectionsDocument,
  GetSectionsQuery,
} from "../client/generated/graphql";
import Layout from "../components/Layout";
import { apolloClient } from "../utils/apolloClient";

interface HomeProps {
  data: ApolloQueryResult<GetSectionsQuery>;
}

const Home: NextPage<HomeProps> = ({ data }) => {
  // const { data: sectionsData, error } = data;

  return (
    <>
      <Head>
        <title>Greens Designs</title>
        <meta
          name="description"
          content="Greens Designs' Mission: We seek to create genuine spaces that showcase our design beliefs through our client's vision."
        />
      </Head>
      <Layout>
        <h3 className="text-center mb-8 text-2xl text-gray-500">
          We seek to create genuine spaces that showcase our design
          beliefs through our client&apos;s vision
        </h3>

        {/* {error ? (
          <div className="text-2xl w-full flex items-center justify-center min-h-[300px] text-red-500">
            Something went wrong!
          </div>
        ) : (
          <>
            {sectionsData.getSections?.map((section) => (
              <div
                key={section.id}
                className="mb-10 flex flex-col items-center"
              >
                <div className="relative w-full h-[600px]">
                  <Image
                    src={section.coverImage}
                    layout="fill"
                    objectFit="cover"
                    alt={section.title}
                    priority
                  />
                </div>
                <h3 className="text-center my-6 text-3xl text-gray-500">
                  {section.title}
                </h3>
                <button className="btn text-lg">See Projects</button>
              </div>
            ))}
          </>
        )} */}
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // const data = await apolloClient.query<GetSectionsQuery>({
  //   query: GetSectionsDocument,
  // });

  return {
    props: {
      data: {},
    },
    revalidate: 20,
  };
};
