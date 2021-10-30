import * as React from "react";
import { useEffect, useState } from "react";
import styled, { css, DefaultTheme, useTheme } from "styled-components";
import { getRecipies } from "firebase/__mocks__/clientApp";
import { Recipe as RecipeType } from "models/recipie";
import { weekdays } from "models/weekdays";
import { Recipe } from "components/Recipe";
import { Info } from "components/Info";
import { mediaQueries } from "styles/theme";

export const RecipeList: React.FunctionComponent = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>();
    const theme = useTheme();

    useEffect(() => {
        (async () => {
            const data = await getRecipies({ count: 5 });
            setRecipes(data);
        })();
    }, []);
    const colors = colorMappings(theme);
    return (
        <List>
            {recipes?.map((r, i) => (
                <Recipe
                    key={i}
                    recipe={r}
                    weekday={weekdays[i]}
                    backgroundColor={colors[weekdays[i]].backgroundColor}
                    color={colors[weekdays[i]].color}
                />
            ))}
            <Info />
        </List>
    );
};

const colorMappings = (
    theme: DefaultTheme
): {
    [weekday in typeof weekdays[number]]: {
        backgroundColor: string;
        color: string;
    };
} => {
    return {
        monday: {
            backgroundColor: theme.colors.amber[400],
            color: theme.colors.blue[800],
        },
        tuesday: {
            backgroundColor: theme.colors.orange[400],
            color: theme.colors.white,
        },
        wednesday: {
            backgroundColor: theme.colors.pink[400],
            color: theme.colors.blue[800],
        },
        thursday: {
            backgroundColor: theme.colors.purple[400],
            color: theme.colors.orange[200],
        },
        friday: {
            backgroundColor: theme.colors.blue[400],
            color: theme.colors.amber[300],
        },
    };
};

const List = styled.div`
    display: grid;
    min-height: 100vh;
    min-width: 100vw;

    grid-template-areas:
        "monday"
        "tuesday"
        "wednesday"
        "thursday"
        "friday"
        "info";

    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    ${mediaQueries.tablet} {
        grid-template-areas:
            "monday tuesday wednesday"
            "thursday friday info";
    }
`;
