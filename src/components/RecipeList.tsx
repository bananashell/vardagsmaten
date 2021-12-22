import { allRecipies } from "firebase/__mocks__/clientApp";
import { Recipe } from "models/recipie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TagList } from "./TagList";

export const RecipeList: React.FunctionComponent = () => {
    const [allRecipes, setAllRecipes] = useState<Recipe[]>();
    useEffect(() => {
        (async () => {
            setAllRecipes(await allRecipies());
        })();
    }, []);

    return (
        <div className="container m-auto">
            <h1>Alla recept</h1>
            <ul className={"flex flex-col gap-1"}>
                {allRecipes?.map((r, i) => (
                    <li
                        key={r.id}
                        className={`flex gap-1 py-1 px-2 items-center ${
                            i % 2 ? "bg-gray-200" : ""
                        }`}
                    >
                        <Link href={`/admin/details?id=${r.id}`}>
                            <a className="self-end btn justify-self-end">
                                Ändra
                            </a>
                        </Link>
                        <div className="flex flex-row items-center justify-between flex-1 gap-4">
                            <span className="flex-1">{r.title}</span>
                            <span>
                                <TagList tags={r.tags} />
                            </span>
                            <span
                                className={`px-2 py-1 ${
                                    r.recipe_links.length == 0
                                        ? "bg-red-200"
                                        : "bg-green-200"
                                } rounded-3xl`}
                            >
                                {r.recipe_links.length} recept
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
