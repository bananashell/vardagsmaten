import { getRecipe } from "firebase/clientApp";
import { Recipe } from "models/recipie";
import { useQuery, QueryOptions } from "react-query";

export const useRecipe = (
    { id }: { id: string },
    options?: QueryOptions<Recipe>
) => {
    return useQuery(
        "get_recipe",
        async () => {
            const recipe = await getRecipe({ id: id });
            return recipe;
        },
        options
    );
};
