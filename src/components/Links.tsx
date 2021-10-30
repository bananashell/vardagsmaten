import { FunctionComponent } from "react";
import Link from "next/link";
import styled from "styled-components";
type Props = {
    links: string[];
};
export const Links: FunctionComponent<Props> = ({ links }) => {
    if (!links?.length) {
        return null;
    }

    return (
        <LinkList>
            {links
                .filter((x) => x)
                .map((l, i) => (
                    <li key={i}>
                        <Link href={l}>{extractHostname(l)}</Link>
                    </li>
                ))}
        </LinkList>
    );
};

const LinkList = styled.ul`
    list-style-type: none;
    padding: 0;
    justify-self: end;
    align-self: center;
    text-align: right;
`;

const extractHostname = (url: string) => {
    try {
        const u = new URL(url);
        return `${u.hostname}`;
    } catch {
        return undefined;
    }
};
