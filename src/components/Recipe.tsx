import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Recipe as RecipeType } from "../models/recipie";
import { weekdays } from "../models/weekdays";
import { Links } from "./Links";
import { TagList } from "./TagList";

type Props = {
    recipe: RecipeType;
    weekday: typeof weekdays[number];
    backgroundColor: string;
    color: string;
};

const weekdayTranslations: { [weekday in typeof weekdays[number]]: string } = {
    monday: "måndag",
    tuesday: "tisdag",
    wednesday: "onsdag",
    thursday: "torsdag",
    friday: "fredag",
};

export const Recipe: FunctionComponent<Props> = ({
    recipe,
    weekday,
    backgroundColor,
    color,
}) => {
    return (
        <Container backgroundColor={backgroundColor} color={color}>
            <DayOfTheWeek>{weekdayTranslations[weekday]}</DayOfTheWeek>
            <Title>{recipe.title}</Title>
            <Links links={recipe.recipe_links} />
            <TagList tags={recipe.tags} />
        </Container>
    );
};

const Container = styled.div<{ backgroundColor: string; color: string }>`
    display: grid;
    grid-template-areas:
        "dayOfTheWeek"
        "title"
        "links"
        "tags";

    padding: 30px;
    color: ${({ color }) => color};
    background-color: ${({ backgroundColor }) => backgroundColor};
`;

const DayOfTheWeek = styled.small`
    margin: 0;
    padding: 0;
    grid-area: dayOfTheWeek;
    align-self: end;
    font-weight: normal;
    font-size: 2vmax;
`;

const Title = styled.h2`
    margin: 0;
    padding: 0;
    grid-area: title;
    font-size: 4vmax;
    font-weight: bold;
`;
