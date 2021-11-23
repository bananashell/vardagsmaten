import * as React from "react";
import { useEffect } from "react";
import { Recipe } from "components/Recipe";
import { Info } from "components/Info";
import { useStore } from "store/useStore";
import { useRouter } from "next/router";

type Props = {
    foodIds?: string[];
    isReady: boolean;
};

export const RecipeGrid: React.FunctionComponent<Props> = ({
    foodIds,
    isReady,
}) => {
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
            <Recipe weekday={"monday"} />
            <Recipe weekday={"tuesday"} />
            <Recipe weekday={"wednesday"} />
            <Recipe weekday={"thursday"} />
            <Recipe weekday={"friday"} />

            <Info />
        </List>
    );
};
const List: React.FunctionComponent = ({ children }) => {
    return (
        <div className="grid min-w-full min-h-screen grid-cols-1 overflow-hidden auto-rows-fr lg:grid-cols-3 lg:h-screen">
            {children}
        </div>
    );
};
