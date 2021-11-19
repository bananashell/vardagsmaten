import { FunctionComponent } from "react";

export const TagList: FunctionComponent<{ tags: string[] }> = ({ tags }) => {
    if (!tags?.length) {
        return null;
    }

    return (
        <div className="flex gap-2 justify-end mt-2">
            {tags
                .filter((x) => x)
                .map((t, i) => (
                    <i
                        className="px-2 py-1 text-white bg-gray-400 rounded-md lowercase"
                        key={i}
                    >
                        {t}
                    </i>
                ))}
        </div>
    );
};
