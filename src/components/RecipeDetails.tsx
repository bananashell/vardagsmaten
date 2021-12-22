import { useRecipe } from "hooks/useRecipe";
import { DOMAttributes, useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { TagList } from "./TagList";

type Inputs = {
    title: string;
    tags: { value: string }[];
    recipe_links: { value: string }[];
    newTag: string;
    newRecipeLink: string;
};

export const RecipeDetails: React.FunctionComponent<{ id: string }> = ({
    id,
}) => {
    const { isLoading, isError, isSuccess, data } = useRecipe({ id: id });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        getValues,
        setValue,
        setFocus,
    } = useForm<Inputs>({
        defaultValues: {
            title: data?.title,
            tags: data?.tags.map((t) => ({ value: t })),
            recipe_links: data?.recipe_links.map((r) => ({ value: r })),
        },
        mode: "onBlur",
    });

    useEffect(() => {
        if (!data) {
            return;
        }

        setValue("title", data.title);
        setValue(
            "tags",
            data.tags.map((t) => ({ value: t }))
        );
        setValue(
            "recipe_links",
            data.recipe_links.map((r) => ({ value: r }))
        );
    }, [data, setValue]);

    const {
        fields: tagFields,
        append: appendTag,
        remove: removeTag,
    } = useFieldArray({
        name: "tags",
        control,
    });
    const {
        fields: linkFields,
        append: appendLink,
        remove: removeLink,
    } = useFieldArray({
        name: "recipe_links",
        control,
    });

    const onAddTag = () => {
        const { newTag } = getValues();
        appendTag({ value: newTag });
        setValue("newTag", "");
        setFocus("newTag");
    };

    const onAddRecipeLink = () => {
        const { newRecipeLink } = getValues();
        appendLink({ value: newRecipeLink });
        setValue("newRecipeLink", "");
        setFocus("newRecipeLink");
    };

    const onKeyPressTag: DOMAttributes<HTMLInputElement>["onKeyPress"] = (
        e
    ) => {
        if (e.key.toLowerCase() === "enter" && !e.shiftKey) {
            e.preventDefault();
            onAddTag();
        }
    };

    const onKeyPressRecipeLink: DOMAttributes<HTMLInputElement>["onKeyPress"] =
        (e) => {
            if (e.key.toLowerCase() === "enter" && !e.shiftKey) {
                e.preventDefault();
                onAddRecipeLink();
            }
        };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("data", data);
        // const recipe: Recipe = {
        //     id: AutoId.newId(),
        //     title: title,
        //     tags: tags,
        //     recipe_links: recipe_links,
        // };

        // addRecipe({ recipe });
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
            className="container flex flex-col gap-4 mx-auto"
        >
            <div className="flex items-center gap-2">
                <label htmlFor="title">Rubrik</label>
                <input
                    id="title"
                    type="text"
                    defaultValue={data?.title || ""}
                    className="border border-black input"
                    {...register("title", { required: true })}
                />
                {errors.title && <span>Rubrik är obligatoriskt</span>}
            </div>

            <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                    <label htmlFor="tags">Taggar</label>
                </div>
                <div className="flex flex-wrap justify-start gap-3 border border-black input ">
                    <TagList
                        tags={tagFields.map((f) => f.value)}
                        className="flex-1"
                        wrap={true}
                        justifyStart={true}
                        onDelete={removeTag}
                    />
                    <div className="flex gap-1 align-middle">
                        <input
                            id="newTag"
                            type="text"
                            {...register("newTag")}
                            onKeyPress={onKeyPressTag}
                            className="input"
                        />
                        <button
                            type="button"
                            className="btn"
                            onClick={onAddTag}
                        >
                            Lägg till tag
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                    <label htmlFor="tags">Receptlänkar</label>
                </div>
                <div className="flex gap-3">
                    <input
                        id="newRecipeLink"
                        type="text"
                        {...register("newRecipeLink")}
                        onKeyPress={onKeyPressRecipeLink}
                        className="border border-black input"
                    />
                    <button
                        type="button"
                        className="btn"
                        onClick={onAddRecipeLink}
                    >
                        Lägg till receptlänk
                    </button>
                </div>
                <TagList
                    tags={linkFields.map((f) => f.value)}
                    className="flex-1"
                    column={true}
                    onDelete={removeLink}
                />
            </div>

            {/* <label htmlFor="recipe_links">Links</label>
            <input
                id="recipe_links"
                type="text"
                defaultValue={data?.recipe_links || []}
                {...register("recipe_links", { required: false })}
            /> */}

            <input type="submit" className="self-center btn-primary" />
        </form>
    );
};
