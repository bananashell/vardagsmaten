import { Recipe } from "../../models/recipie";

export async function allRecipies(): Promise<Recipe[]> {
    return mockData;
}

export async function addRecipe({ recipe }: { recipe: Recipe }) {}

const mockData: Recipe[] = [
    {
        id: "1",
        recipe_links: [
            "https://www.koket.se/mitt-kok/jennie-wallden/klassisk-kottfarssas-med-spaghetti",
            "https://www.arla.se/recept/kottfarssas/",
        ],
        title: "Spaghetti och köttfärssås",
        tags: ["barnvänligt", "snabbt"],
    },
    {
        id: "2",
        recipe_links: [],
        title: "Blodpudding",
        tags: ["barnvänligt", "snabbt"],
    },
    {
        id: "3",
        recipe_links: [
            "https://www.koket.se/mitt-kok/jennie-wallden/klassisk-kottfarssas-med-spaghetti",
            "https://www.arla.se/recept/kottfarssas/",
        ],
        title: "Kyckling parmesan",
        tags: [],
    },
    {
        id: "4",
        recipe_links: [
            "https://www.koket.se/mitt-kok/jennie-wallden/klassisk-kottfarssas-med-spaghetti",
            "https://www.arla.se/recept/kottfarssas/",
            "https://www.tasteline.se/recept/kottfarssas/",
        ],
        title: "Souvlaki",
        tags: [],
    },
    {
        id: "5",
        recipe_links: [
            "https://www.koket.se/mitt-kok/jennie-wallden/klassisk-kottfarssas-med-spaghetti",
            "https://www.arla.se/recept/kottfarssas/",
            "https://www.tasteline.se/recept/kottfarssas/",
        ],
        title: "Fishtacos",
        tags: ["fisk"],
    },
    {
        id: "6",
        recipe_links: [
            "https://www.koket.se/mitt-kok/jennie-wallden/klassisk-kottfarssas-med-spaghetti",
            "https://www.arla.se/recept/kottfarssas/",
            "https://www.tasteline.se/recept/kottfarssas/",
        ],
        title: "Hamburgare",
        tags: ["snabbt", "barnvänligt"],
    },
    {
        id: "7",
        recipe_links: [],
        title: "Pyttipanna",
        tags: ["snabbt", "barnvänligt"],
    },
    {
        id: "8",
        recipe_links: [
            "https://www.koket.se/mitt-kok/jennie-wallden/klassisk-kottfarssas-med-spaghetti",
            "https://www.arla.se/recept/kottfarssas/",
            "https://www.tasteline.se/recept/kottfarssas/",
        ],
        title: "Köttbullar med potatismos och gräddsås",
        tags: ["snabbt", "barnvänligt"],
    },
    {
        id: "9",
        recipe_links: [
            "https://www.koket.se/mitt-kok/jennie-wallden/klassisk-kottfarssas-med-spaghetti",
            "https://www.arla.se/recept/kottfarssas/",
            "https://www.tasteline.se/recept/kottfarssas/",
        ],
        title: "Pizza",
        tags: ["snabbt", "barnvänligt"],
    },
];
