import { FunctionComponent } from "react";

export const TagList: FunctionComponent<{
    tags: string[];
    justifyStart?: boolean;
    wrap?: boolean;
    column?: boolean;
    className?: string;
    onDelete?: (index: number) => void;
}> = ({
    tags,
    className,
    onDelete,
    wrap = true,
    justifyStart = true,
    column = false,
}) => {
    if (!tags?.length) {
        return null;
    }

    const handleDelete = (text: string) => {
        if (!onDelete) {
            return;
        }

        const i = tags.indexOf(text);
        onDelete(i);
    };

    return (
        <div
            className={`flex gap-2 justify-center
            ${justifyStart ? "justify-start" : "justify-end"}
            ${wrap && "flex-wrap"}
            ${column ? "flex-col" : "items-center"}
            ${className}`}
        >
            {tags
                .filter((x) => x)
                .sort()
                .map((t, i) => (
                    <i
                        className="flex justify-between gap-2 px-2 py-1 text-white lowercase bg-gray-400 rounded-md"
                        key={i}
                    >
                        <span
                            className="max-w-xs overflow-hidden overflow-ellipsis"
                            title={t}
                        >
                            {t}
                        </span>
                        {onDelete && (
                            <button
                                className="box-border self-center self-end w-5 h-5 text-black bg-gray-200 rounded-md hover:bg-gray-300"
                                onClick={() => handleDelete(t)}
                            >
                                x
                            </button>
                        )}
                    </i>
                ))}
        </div>
    );
};
