import { darken, lighten } from "polished";

const generateColors = ({ baseColor }: { baseColor: string }) => {
    return {
        50: lighten(0.3, baseColor),
        100: lighten(0.2, baseColor),
        200: lighten(0.1, baseColor),
        300: lighten(0.05, baseColor),
        400: baseColor,
        500: darken(0.05, baseColor),
        600: darken(0.1, baseColor),
        700: darken(0.2, baseColor),
        800: darken(0.3, baseColor),
        900: darken(0.4, baseColor),
    };
};

const breakpoints = {
    xsmall: 0,
    small: 320,
    medium: 720,
    large: 1024,
    xlarge: 1200,
};

const customMediaQuery = (minWidth: number) =>
    `@media (min-width: ${minWidth}px)`;

export const mediaQueries = {
    custom: customMediaQuery,
    phone: customMediaQuery(breakpoints.small),
    tablet: customMediaQuery(breakpoints.medium),
    desktop: customMediaQuery(breakpoints.large),
};

export const theme = {
    colors: {
        amber: generateColors({ baseColor: "#ffbe0b" }),
        orange: generateColors({ baseColor: "#fb5607" }),
        pink: generateColors({ baseColor: "#ff006e" }),
        purple: generateColors({ baseColor: "#8338ec" }),
        blue: generateColors({ baseColor: "#3a86ff" }),
        white: "#FFF",
    },
};
