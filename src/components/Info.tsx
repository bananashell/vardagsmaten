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
        <article className="flex flex-col items-end justify-end gap-1 p-8">
            {canShare && (
                <a
                    className="px-2 py-1 mb-auto text-white transition-all bg-blue-400 rounded select-none right-8 top-8 justify-self-start hover:bg-blue-300"
                    href={"javascript:;"}
                    onClick={handleShare}
                >
                    Dela menyn
                </a>
            )}
            <h2 className="text-4xl font-bold">
                <Link href={"./"}>
                    <a>Vardagsmaten</a>
                </Link>
            </h2>

            <i className="text-sm">Skapat av Joakim Jäderberg </i>
            <div className="grid items-center grid-flow-col gap-1">
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
