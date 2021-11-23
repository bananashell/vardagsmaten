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
    QueryDocumentSnapshot,
    DocumentData,
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

export async function allRecipies(): Promise<Recipe[]> {
    const recipesCol = collection(db, "recipes");
    const recipeList = await getDocs(recipesCol);

    return recipeList.docs.map(mapDocumentToRecipe);
}

export async function getRecipe({ id }: { id: string }) {
    const recipesCol = collection(db, "recipes");
    const recipeQuery = query(
        recipesCol,
        where(documentId(), "==", id),
        limit(1)
    );

    const recipe = await getDocs(recipeQuery);

    return recipe.docs.map(mapDocumentToRecipe)[0];
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
    return recipeList.docs.map(mapDocumentToRecipe);
}

export async function addRecipe({ recipe }: { recipe: Recipe }) {
    await addDoc(collection(db, "recipes"), recipe);
}

const mapDocumentToRecipe = (x: QueryDocumentSnapshot<DocumentData>) => {
    return { id: x.id, ...x.data() } as Recipe;
};
