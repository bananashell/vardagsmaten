export function randomInt({ min, max }: { min?: number; max: number }) {
    min ??= 0;

    return Math.floor(Math.random() * (max - min) + min);
}
