import { RecipeDetails } from "components/RecipeDetails";
import { RecipeList } from "components/RecipeList";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { Suspense } from "react";

const RecipeDetailsPage: NextPage = () => {
    const { query, isReady } = useRouter();
    let { id } = query;

    if (!isReady) {
        return <div>Loading...</div>;
    }

    if (!id) {
        throw new Error("No id");
    }

    if (typeof id !== "string") {
        throw new Error("Only a single string id is valid");
    }

    return (
        <Suspense fallback={"Loading"}>
            <RecipeDetails id={id} />
        </Suspense>
    );
};

export default RecipeDetailsPage;
