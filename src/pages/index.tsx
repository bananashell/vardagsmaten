import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { RecipeList } from "../components/RecipeList";

const Home: NextPage = () => {
    const { query, isReady } = useRouter();

    let { id } = query;
    if (typeof id === "string") {
        id = [id];
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
            <RecipeList foodIds={id} isReady={isReady} />
        </>
    );
};

export default Home;
