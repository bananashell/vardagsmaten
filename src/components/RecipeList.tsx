import * as React from "react";
import { useEffect } from "react";
import styled, { DefaultTheme, useTheme } from "styled-components";
import { weekdays } from "models/weekdays";
import { Recipe } from "components/Recipe";
import { Info } from "components/Info";
import { mediaQueries } from "styles/theme";
import { useStore } from "store/useStore";
import { useRouter } from "next/router";

type Props = {
    foodIds?: string[];
    isReady: boolean;
};

export const RecipeList: React.FunctionComponent<Props> = ({
    foodIds,
    isReady,
}) => {
    const theme = useTheme();
    const colors = colorMappings(theme);
    const router = useRouter();

    const { initialize, isSuccess, applyFoodToWeekdays, foodPerWeekday } =
        useStore();

    useEffect(() => {
        initialize({});
    }, [initialize]);

    useEffect(() => {
        if (!isReady || !isSuccess) {
            return;
        }
        applyFoodToWeekdays({ foodIds: foodIds });
    }, [foodIds, isReady, isSuccess, applyFoodToWeekdays]);

    useEffect(() => {
        if (!Object.values(foodPerWeekday).some((x) => x)) {
            return;
        }

        router.push(
            `/?${Object.values(foodPerWeekday)
                .map((x) => `id=${x?.id || -1}`)
                .join("&")}`,
            undefined,
            { shallow: true }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...Object.values(foodPerWeekday)]);

    return (
        <List>
            <Recipe
                weekday={"monday"}
                backgroundColor={colors["monday"].backgroundColor}
                color={colors["monday"].color}
            />
            <Recipe
                weekday={"tuesday"}
                backgroundColor={colors["tuesday"].backgroundColor}
                color={colors["tuesday"].color}
            />
            <Recipe
                weekday={"wednesday"}
                backgroundColor={colors["wednesday"].backgroundColor}
                color={colors["wednesday"].color}
            />
            <Recipe
                weekday={"thursday"}
                backgroundColor={colors["thursday"].backgroundColor}
                color={colors["thursday"].color}
            />
            <Recipe
                weekday={"friday"}
                backgroundColor={colors["friday"].backgroundColor}
                color={colors["friday"].color}
            />

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
