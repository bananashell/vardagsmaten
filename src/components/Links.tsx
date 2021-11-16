import { FunctionComponent } from "react";
import Link from "next/link";

type Props = {
    links: string[];
};
export const Links: FunctionComponent<Props> = ({ links }) => {
    if (!links?.length) {
        return null;
    }

    return (
         <ul className="p-0 mt-2 text-right list-none">

            {links
                .filter((x) => x)
                .map((l, i) => (
                    <li key={i}>
                        <Link href={l}>{extractHostname(l)}</Link>
                    </li>
                ))}

                </ul>
    );
};

const extractHostname = (url: string) => {
    try {
        const u = new URL(url);
        return `${u.hostname}`;
    } catch {
        return undefined;
    }
};
