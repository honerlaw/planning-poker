import { nanoid } from "nanoid";
import { useMemo } from "react";
import { adjectives, animals, uniqueNamesGenerator } from "unique-names-generator";

export function getRandomName() {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        style: 'capital',
        separator: ' ',
        seed: nanoid()
    });
}

export function useMemoizedRandomName() {
    return useMemo(getRandomName, []);
}
