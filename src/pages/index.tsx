import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { RecipeGrid } from "../components/RecipeGrid";

const Home: NextPage = () => {
    const { query, isReady } = useRouter();

    let { id: ids } = query;
    if (typeof ids === "string") {
        ids = [ids];
    }

    return (
        <>
            <Head>
                <title>Vardagsmaten</title>

                <meta property="og:title" content="Vardagsmaten" key="title" />
                <meta
                    name="description"
                    content="När fantasin behöver hjälp att sätta veckomenyn"
                    key="description"
                />
            </Head>
            <RecipeGrid foodIds={ids} isReady={isReady} />
        </>
    );
};

export default Home;
