import Link from "next/link";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import GithubImg from "public/GitHub-Mark-32px.png";
import LinkedInImg from "public/LI-In-Bug.png";
import { imageLoader } from "util/imageLoader";

export const Info: FunctionComponent = () => {
    const canShare = typeof navigator !== "undefined" && "share" in navigator;
    const handleShare = async () => {
        try {
            await navigator.share({
                title: "Vardagsmaten",
                url: location.href,
            });
        } catch (err) {}
    };

    return (
        <Container>
            <h2>
                <Link href={"./"}>
                    <a>Vardagsmaten</a>
                </Link>
            </h2>
            {canShare && (
                <ShareButton href={"javascript:;"} onClick={handleShare}>
                    Dela menyn
                </ShareButton>
            )}

            <i>Skapat av Joakim Jäderberg </i>
            <div>
                <Link href={"https://github.com/bananashell"}>
                    <a>
                        <Image
                            alt={"Github"}
                            src={GithubImg}
                            layout="responsive"
                            objectFit="contain"
                            loader={imageLoader}
                            unoptimized={true}
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
                            loader={imageLoader}
                            unoptimized={true}
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
        "share"
        "heading"
        "creator"
        "links";
    text-align: right;
    padding: 30px;
    grid-template-rows: auto min-content min-content min-content;
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

const ShareButton = styled.a`
    align-self: start;
    justify-self: end;

    user-select: none;

    color: ${({ theme }) => theme.colors.white};

    background: ${({ theme }) => theme.colors.blue["400"]};
    padding: 5px 7px;
    border-radius: 5px;
    transition: all 200ms;

    &:hover {
        background: ${({ theme }) => theme.colors.blue["300"]};
    }
    &:active {
        background: ${({ theme }) => theme.colors.blue["300"]};
        transform: scale(0.95);
    }
`;
