import { getRecipe } from "firebase";
import { Recipe } from "models/recipie";
import { useQuery, QueryOptions } from "react-query";

export const useRecipe = (
    { id }: { id: string },
    options?: QueryOptions<Recipe>
) => {
    return useQuery(
        ["get_recipe", id],
        async () => {
            const recipe = await getRecipe({ id: id });
            return recipe;
        },
        options
    );
};
