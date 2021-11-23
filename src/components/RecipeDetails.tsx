import { AutoId } from "firebase/util";
import { useRecipe } from "hooks/useRecipe";
import { useState } from "react";
import { appendErrors, SubmitHandler, useForm } from "react-hook-form";
import { addRecipe } from "../firebase/clientApp";
import { Recipe } from "../models/recipie";

type Inputs = {
    title: string;
    tags: string[];
    recipe_links: string[];
};

export const RecipeDetails: React.FunctionComponent<{ id: string }> = ({
    id,
}) => {
    const { isLoading, isError, isSuccess, data } = useRecipe({ id: id });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = ({ title, tags, recipe_links }) => {
        const recipe: Recipe = {
            id: AutoId.newId(),
            title: title,
            tags: tags,
            recipe_links: recipe_links,
        };

        addRecipe({ recipe });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="container flex gap-4 mx-auto"
        >
            <div className="flex items-center gap-2">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    defaultValue={data?.title || ""}
                    className="px-2 py-1 border border-black"
                    {...register("title", { required: true })}
                />
                {errors.title && <span>Rubrik är obligatoriskt</span>}
            </div>

            {/* <label htmlFor="tags">Tags</label>
            <input
                id="tags"
                type="text"
                defaultValue={data?.tags || []}
                {...register("tags", { required: false })}
            />

            <label htmlFor="recipe_links">Links</label>
            <input
                id="recipe_links"
                type="text"
                defaultValue={data?.recipe_links || []}
                {...register("recipe_links", { required: false })}
            />

            <input type="submit">Spara</input> */}
        </form>
    );
};
