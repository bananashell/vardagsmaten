import { FunctionComponent } from "react";

export const TagList: FunctionComponent<{ tags: string[] }> = ({ tags }) => {
    if (!tags?.length) {
        return null;
    }

    return (
        <div className="flex justify-end gap-2 mt-2">
            {tags
                .filter((x) => x)
                .map((t, i) => (
                    <i className="px-2 py-1 text-white lowercase bg-gray-400 rounded-md" key={i}>{t}</i>
                ))}
        </div>
    );
};