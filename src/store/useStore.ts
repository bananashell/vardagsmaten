import create from "zustand";
import { devtools } from "zustand/middleware";
import { Recipe } from "models/recipie";
import { weekdays } from "models/weekdays";
import { allRecipies } from "firebase/clientApp";
import { randomInt } from "util/random";

export type State = {
    isLoading: boolean;
    isSuccess: boolean;
    allRecipes: Recipe[];
    initialize: ({ forceReload }: { forceReload?: boolean }) => Promise<void>;
    foodPerWeekday: { [weekday in typeof weekdays[number]]?: Recipe };
    applyFoodToWeekdays: ({ foodIds }: { foodIds?: string[] }) => void;
    randomize: (weekday: typeof weekdays[number]) => void;
};

export const useStore = create<State>(
    devtools(
        (set, get) => ({
            allRecipes: [],
            isLoading: false,
            isSuccess: false,
            initialize: async ({ forceReload }) => {
                const { isLoading } = get();
                if (isLoading && !forceReload) {
                    return;
                }

                set({ allRecipes: [], isLoading: true });

                const recipes = await allRecipies();

                set({
                    allRecipes: recipes || [],
                    isLoading: false,
                    isSuccess: true,
                });
            },
            applyFoodToWeekdays: ({ foodIds }: { foodIds?: string[] }) => {
                foodIds ??= [];
                const { allRecipes } = get();

                weekdays.map((w, i) => {
                    const { foodPerWeekday } = get();
                    const foodId = foodIds?.[i];
                    let recipe = allRecipes.filter((r) => r.id === foodId)?.[0];
                    if (!recipe) {
                        recipe = randomizeRecipe({
                            allRecipes,
                            foodPerWeekday: foodPerWeekday,
                        });
                    }
                    foodPerWeekday[w] = recipe;
                    set({ foodPerWeekday: foodPerWeekday });
                });
            },
            randomize: (weekday) => {
                const { foodPerWeekday, allRecipes } = get();

                const newState = { ...foodPerWeekday };
                newState[weekday] = randomizeRecipe({
                    allRecipes,
                    foodPerWeekday,
                });

                set({ foodPerWeekday: newState });
            },
            foodPerWeekday: {
                monday: undefined,
                tuesday: undefined,
                wednesday: undefined,
                thursday: undefined,
                friday: undefined,
            },
        }),
        { name: "vardagsmaten" }
    )
);

const randomizeRecipe = ({
    allRecipes,
    foodPerWeekday,
}: {
    allRecipes: Recipe[];
    foodPerWeekday: State["foodPerWeekday"];
}): Recipe => {
    if (!allRecipes) {
        return undefined as unknown as Recipe;
    }

    const excludeIds = weekdays
        .map((w) => {
            return foodPerWeekday[w as typeof weekdays[number]]?.id;
        })
        .filter((x) => x) as string[];

    const filteredData = allRecipes.filter((x) =>
        excludeIds ? excludeIds.indexOf(x.id) < 0 : true
    );

    const index = randomInt({ max: filteredData?.length - 1 });
    return filteredData[index];
};
