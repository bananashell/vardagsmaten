import React, { FunctionComponent } from "react";
import { useStore } from "store/useStore";
import { weekdays } from "../models/weekdays";
import { Links } from "./Links";
import { TagList } from "./TagList";
import ReloadIcon from "public/reload-svgrepo-com.svg";
import Image from "next/image";
import { imageLoader } from "util/imageLoader";

type Props = {
    weekday: typeof weekdays[number];
    foodId?: string;
};

const weekdayTranslations: { [weekday in typeof weekdays[number]]: string } = {
    monday: "Måndag",
    tuesday: "Tisdag",
    wednesday: "Onsdag",
    thursday: "Torsdag",
    friday: "Fredag",
};

export const Recipe: FunctionComponent<Props> = ({ weekday, foodId }) => {
    const { randomize, foodPerWeekday, isLoading, isSuccess } = useStore();
    const recipe = foodPerWeekday[weekday];

    return (
        <Container weekday={weekday}>
            {isLoading && "Loading"}
            {isSuccess && recipe && (
                <>
                    <div className="flex justify-between flex-grow-0">
                        <h3 className="py-0 lowercase text-l md:text-xl lg:text-2xl">
                            {weekdayTranslations[weekday]}
                        </h3>
                        <button
                            onClick={() => randomize(weekday)}
                            className="w-5 h-5 transition-all transform rotate-0 hover:rotate-180"
                        >
                            <Image
                                src={ReloadIcon}
                                alt={"Reload"}
                                width={30}
                                height={30}
                                objectFit={"fill"}
                                loader={imageLoader}
                                className="drop-shadow-md filter"
                            />
                        </button>
                    </div>
                    <h2 className="flex-1 p-0 m-0 text-xl font-bold md:text-3xl lg:text-5xl">
                        {recipe.title}
                    </h2>
                    <Links links={recipe.recipe_links} />
                    <TagList tags={recipe.tags} />
                </>
            )}
        </Container>
    );
};

const weekdayStyling: { [weekday in typeof weekdays[number]]: string } = {
    monday: "bg-amber-400 text-blue-800",
    tuesday: "bg-orange-400 text-white",
    wednesday: "bg-pink-400 text-blue-800",
    thursday: "bg-purple-400 text-orange-200",
    friday: "bg-blue-400 text-amber-300",
};

const Container: React.FunctionComponent<{ weekday: typeof weekdays[number] }> =
    ({ children, weekday }) => {
        return (
            <article
                className={`container p-7 flex flex-col ${weekdayStyling[weekday]}`}
            >
                {children}
            </article>
        );
    };