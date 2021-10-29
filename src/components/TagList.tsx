import { FunctionComponent } from "react";
import styled from "styled-components";

export const TagList: FunctionComponent<{ tags: string[] }> = ({ tags }) => {
    if (!tags?.length) {
        return null;
    }

    return (
        <Tags>
            {tags.map((t, i) => (
                <Tag key={i}>{t}</Tag>
            ))}
        </Tags>
    );
};

const Tags = styled.div`
    display: flex;
    gap: 1rem;
    justify-self: end;
    align-self: end;
`;

const Tag = styled.i`
    display: inline-block;
    text-transform: lowercase;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    padding: 5px 7px;
`;
