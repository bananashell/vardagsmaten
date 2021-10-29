import * as React from "react";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { getRecipies } from "../firebase/__mocks__/clientApp";
import { Recipe as RecipeType } from "../models/recipie";
import { weekdays } from "../models/weekdays";
import { Recipe } from "./Recipe";

export const RecipeList: React.FunctionComponent = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>();
    useEffect(() => {
        (async () => {
            const data = await getRecipies({ count: 5 });
            setRecipes(data);
        })();
    }, []);

    return (
        <List>
            {recipes?.map((r, i) => (
                <Recipe key={i} recipe={r} weekday={weekdays[i]} />
            ))}
        </List>
    );
};

const colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];

const List = styled.div`
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-template-areas:
        "monday tuesday wednesday"
        "thursday friday info";

    ${colors.map(
        (c, i) => css`
            > *:nth-child(${i + 1}) {
                background-color: ${c};
            }
        `
    )}
`;
