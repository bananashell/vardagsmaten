import { Recipe } from "../../models/recipie";
import { AutoId } from "../util";

export async function getRecipies({
    count,
}: {
    count: number;
}): Promise<Recipe[]> {
    let recipes: Recipe[] = [];

    // firebase has no current way of fetching multiple random documents at once
    while (recipes.length < count) {
        const recipe: Recipe = {
            id: "123",
            recipe_links: [
                "https://www.koket.se/mitt-kok/jennie-wallden/klassisk-kottfarssas-med-spaghetti",
                "https://www.arla.se/recept/kottfarssas/",
            ],
            title: "Spaghetti och köttfärssås",
            tags: ["barnvänligt", "snabbt"],
        };
        recipes = [...recipes, recipe];
    }

    return recipes;
}

export async function addRecipe({ recipe }: { recipe: Recipe }) {}
