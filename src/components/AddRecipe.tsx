import { AutoId } from "firebase/util";
import { useState } from "react";
import { addRecipe } from "../firebase/clientApp";
import { Recipe } from "../models/recipie";

export const AddRecipe = () => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");

    const handleClick = () => {
        const recipe: Recipe = {
            id: AutoId.newId(),
            title: title,
            tags: tags.split(","),
            recipe_links: [],
        };

        addRecipe({ recipe });
    };

    return (
        <div>
            <label htmlFor="title">Title</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value);
                }}
            />

            <label htmlFor="tags">Tags</label>
            <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => {
                    setTags(e.currentTarget.value);
                }}
            />

            <button onClick={handleClick}>Save</button>
        </div>
    );
};
