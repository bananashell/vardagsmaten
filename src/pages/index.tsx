import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { RecipeList } from "../components/RecipeList";

const Home: NextPage = () => {
    return (
        <>
            <RecipeList />
        </>
    );
};

export default Home;
