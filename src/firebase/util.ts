import { randomInt } from "util/random";

export class AutoId {
    static newId(): string {
        // Alphanumeric characters
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // The largest byte value that is a multiple of `char.length`.
        const maxMultiple = Math.floor(256 / chars.length) * chars.length;

        let autoId = "";
        const targetLength = 20;
        while (autoId.length < targetLength) {
            const max = chars.length - 1;
            const randomValue = randomInt({ max: max });
            autoId += chars[randomValue];
        }
        console.assert(
            autoId.length === targetLength,
            "Invalid auto ID: " + autoId
        );

        return autoId;
    }
}

export function uniquesByKey<T>(array: Array<T>, byKey: keyof T) {
    const uniques = [...new Map(array.map((x) => [x[byKey], x])).values()];
    return uniques;
}

export function duplicates<T>(arry: Array<T>) {
    const uniqueElements = new Set(arry);
    arry.filter((item) => {
        if (uniqueElements.has(item)) {
            uniqueElements.delete(item);
        } else {
            return item;
        }
    });

    return [...new Set(uniqueElements)];
}
