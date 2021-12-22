import * as ClientApp from "./clientApp";
import * as MockClientApp from "./__mocks__/clientApp";

const useMock = !(
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_USE_MOCK_DATA
);
console.log("useMock", useMock);
export const getRecipe = useMock
    ? MockClientApp.getRecipe
    : ClientApp.getRecipe;

export const allRecipies = useMock
    ? MockClientApp.allRecipies
    : ClientApp.allRecipies;

export const addRecipe = useMock
    ? MockClientApp.addRecipe
    : ClientApp.addRecipe;
