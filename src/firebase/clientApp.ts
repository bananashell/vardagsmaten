import { initializeApp, FirebaseOptions } from "firebase/app";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    limit,
    where,
    addDoc,
    documentId,
    QueryConstraint,
} from "firebase/firestore";
import { Recipe } from "../models/recipie";
import { AutoId } from "./util";

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getRecipies({
    count,
}: {
    count: number;
}): Promise<Recipe[]> {
    let recipes: Recipe[] = [];

    // firebase has no current way of fetching multiple random documents at once
    while (recipes.length < count) {
        const recipe = await getRandomRecipe({
            excludeIds: recipes.map((r) => r.id),
        });
        recipes = [...recipes, ...recipe];
    }

    return recipes;
}

async function getRandomRecipe({
    excludeIds,
}: {
    excludeIds?: string[];
}): Promise<Recipe[]> {
    const recipesCol = collection(db, "recipes");
    const queryConstraints: QueryConstraint[] = [
        where(documentId(), ">=", AutoId.newId()),
    ];

    if (excludeIds?.length) {
        queryConstraints.push(where(documentId(), "not-in", excludeIds));
    }

    const q = query(recipesCol, ...queryConstraints, limit(1));
    const recipeList = await getDocs(q);
    return recipeList.docs.map((x) => {
        return { id: x.id, ...x.data() } as Recipe;
    });
}

export async function addRecipe({ recipe }: { recipe: Recipe }) {
    await addDoc(collection(db, "recipes"), recipe);
}
