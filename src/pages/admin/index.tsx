import { RecipeList } from "components/RecipeList";
import type { NextPage } from "next";
import React from "react";

const AdminIndex: NextPage = () => {
    return (
        <>
            <RecipeList />
        </>
    );
};

export default AdminIndex;
