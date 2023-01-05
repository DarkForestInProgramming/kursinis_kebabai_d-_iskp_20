import { InferGetServerSidePropsType } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import type { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth/next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { user: "Yra" },
  };
}

export default function Users(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <div>Useriai.....{props.user}</div>;
}
