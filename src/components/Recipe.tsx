import React, { FunctionComponent } from "react";
import { useStore } from "store/useStore";
import styled from "styled-components";
import { weekdays } from "../models/weekdays";
import { Links } from "./Links";
import { TagList } from "./TagList";
import ReloadIcon from "public/reload-svgrepo-com.svg";
import Image from "next/image";
import { imageLoader } from "util/imageLoader";

type Props = {
    weekday: typeof weekdays[number];
    backgroundColor: string;
    color: string;
};

const weekdayTranslations: { [weekday in typeof weekdays[number]]: string } = {
    monday: "Måndag",
    tuesday: "Tisdag",
    wednesday: "Onsdag",
    thursday: "Torsdag",
    friday: "Fredag",
};

export const Recipe: FunctionComponent<Props> = ({
    weekday,
    backgroundColor,
    color,
}) => {
    const { randomize, weekdays } = useStore();
    const recipe = weekdays[weekday];

    return (
        <Container backgroundColor={backgroundColor} color={color}>
            {recipe && (
                <>
                    <DayOfTheWeekContainer>
                        <DayOfTheWeek>
                            {weekdayTranslations[weekday]}
                        </DayOfTheWeek>
                        <RandomizeButton onClick={() => randomize(weekday)}>
                            <Image
                                src={ReloadIcon}
                                alt={"Reload"}
                                width={30}
                                height={30}
                                objectFit={"fill"}
                                loader={imageLoader}
                            />
                        </RandomizeButton>
                    </DayOfTheWeekContainer>
                    <Title>{recipe.title}</Title>
                    <Links links={recipe.recipe_links} />
                    <TagList tags={recipe.tags} />
                </>
            )}
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

    grid-template-rows: min-content 1fr min-content min-content;
    padding: 30px;
    color: ${({ color }) => color};
    background-color: ${({ backgroundColor }) => backgroundColor};
    overflow: hidden;
`;

const DayOfTheWeekContainer = styled.div`
    grid-area: dayOfTheWeek;
    align-self: end;
    display: grid;
    grid-template-columns: max-content min-content;
    justify-content: space-between;
`;

const DayOfTheWeek = styled.small`
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-size: 2vmax;
    text-transform: lowercase;
`;

const Title = styled.h2`
    margin: 0;
    padding: 0;
    grid-area: title;
    font-size: 4vmax;
    font-weight: bold;
    word-wrap: break-word;
`;

const RandomizeButton = styled.button`
    width: 20px;
    height: 20px;
    padding: 0;
    background: transparent;
    border: 0;
    transform: rotate(0deg);
    transition: transform 400ms cubic-bezier(0.68, -0.55, 0.27, 1.55);
    color: white;
    img {
        filter: drop-shadow(1px 1px 1px black);
    }
    &:hover {
        transform: rotate(180deg);
    }
`;
