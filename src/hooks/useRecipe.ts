import { useCollection } from "react-firebase-hooks/firestore";

export const useRecipes = () => {
  return useCollection();
};
