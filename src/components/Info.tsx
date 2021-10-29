import Link from "next/link";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import GithubImg from "public/GitHub-Mark-32px.png";
import LinkedInImg from "public/LI-In-Bug.png";

export const Info: FunctionComponent = () => {
    return (
        <Container>
            <h2>Vardagsmaten</h2>

            <i>Skapat av Joakim Jäderberg </i>
            <div>
                <Link href={"https://github.com/bananashell"}>
                    <a>
                        <Image
                            alt={"Github"}
                            src={GithubImg}
                            layout="responsive"
                            objectFit="contain"
                        />
                    </a>
                </Link>

                <Link
                    href={
                        "https://www.linkedin.com/in/joakim-j%C3%A4derberg-0b450517/"
                    }
                >
                    <a>
                        <Image
                            alt={"LinkedIn"}
                            src={LinkedInImg}
                            layout="responsive"
                            objectFit="contain"
                        />
                    </a>
                </Link>
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-areas:
        "heading"
        "creator"
        "links";
    text-align: right;
    padding: 30px;
    grid-template-rows: auto min-content min-content;
    gap: 1rem;

    h2 {
        grid-area: heading;
        align-self: end;
        font-size: 3vmax;
        margin: 0;
    }

    i {
        grid-area: creator;
        font-size: 1vmax;
        align-self: end;
    }

    div {
        grid-area: links;
        display: grid;
        gap: 1rem;
        grid-template-columns: min-content min-content;
        align-self: end;
        justify-self: end;
        align-items: center;

        a {
            display: inline-block;
            width: 20px;
        }
    }
`;
