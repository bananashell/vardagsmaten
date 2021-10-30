import { Recipe } from "models/recipie";
import { weekdays } from "models/weekdays";
import create from "zustand";
import { allRecipies } from "firebase/clientApp";
import { randomInt } from "util/random";

type State = {
    allRecipes: Recipe[];
    initialize: () => Promise<void>;
    randomize: (weekday: typeof weekdays[number]) => void;
    weekdays: { [weekday in typeof weekdays[number]]?: Recipe };
};

export const useStore = create<State>((set, get) => ({
    allRecipes: [],
    initialize: async () => {
        const { allRecipes } = get();
        if (allRecipes?.length) {
            console.log("already initialized");
            return;
        }

        const recipes = await allRecipies();
        set({ allRecipes: recipes });

        const { randomize } = get();
        weekdays.map((w) => {
            randomize(w);
        });
    },
    randomize: (weekday) => {
        const { weekdays, allRecipes } = get();

        const excludeIds = Object.keys(weekdays)
            .map((w) => {
                return weekdays[w as keyof typeof weekdays]?.id;
            })
            .filter((x) => x) as string[];

        const newState = { ...weekdays };
        newState[weekday] = randomizeRecipe({ allRecipes, excludeIds });

        set({ weekdays: newState });
    },
    weekdays: {
        monday: undefined,
        tuesday: undefined,
        wednesday: undefined,
        thursday: undefined,
        friday: undefined,
    },
}));

const randomizeRecipe = ({
    allRecipes,
    excludeIds,
}: {
    allRecipes: Recipe[];
    excludeIds: string[];
}) => {
    if (!allRecipes) {
        return undefined;
    }

    const filteredData = allRecipes.filter((x) =>
        excludeIds ? excludeIds.indexOf(x.id) < 0 : true
    );

    const index = randomInt({ max: filteredData?.length - 1 });
    return filteredData[index];
};
