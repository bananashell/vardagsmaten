import type { NextPage } from "next";
import { RecipeList } from "../components/RecipeList";

const Home: NextPage = () => {
    return (
        <>
            <RecipeList />
        </>
    );
};

export default Home;
