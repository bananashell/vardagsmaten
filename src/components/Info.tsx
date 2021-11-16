import Link from "next/link";
import Image from "next/image";
import React, { FunctionComponent } from "react";
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
        <article className="relative flex flex-col gap-1 items-end justify-end p-8">
            <h2 className="text-4xl font-bold">
                <Link href={"./"}>
                    <a>Vardagsmaten</a>
                </Link>
            </h2>
            {canShare && (
                <a
                    className="absolute right-8 top-8 px-2 py-1 text-white hover:bg-blue-300 bg-blue-400 rounded select-none transition-all"
                    href={"javascript:;"}
                    onClick={handleShare}
                >
                    Dela menyn
                </a>
            )}

            <i className="text-sm">Skapat av Joakim Jäderberg </i>
            <div className="grid gap-1 grid-flow-col items-center">
                <Link href={"https://github.com/bananashell"}>
                    <a className="w-5">
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
                    <a className="w-5">
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
        </article>
    );
};
