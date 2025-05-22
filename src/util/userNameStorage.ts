"use client"

import { getRandomName } from "./getRandomName";

const USER_NAME_KEY = "planning-poker-user-name";
const USER_ID_KEY = "planning-poker-user-id";

export function getUserName(): string {
    if (typeof window === 'undefined') {
        return getRandomName();
    }

    const storedName = localStorage.getItem(USER_NAME_KEY);
    if (storedName) {
        return storedName;
    }

    const newName = getRandomName();
    localStorage.setItem(USER_NAME_KEY, newName);
    return newName;
}

export function setUserName(name: string): void {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(USER_NAME_KEY, name);
}

export function getUserId(): string | null {
    if (typeof window === 'undefined') {
        return null;
    }

    return localStorage.getItem(USER_ID_KEY);
}

export function setUserId(id: string): void {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(USER_ID_KEY, id);
}

export function usePersistedUserName(): [string, (name: string) => void] {
    const userName = getUserName();

    const updateUserName = (name: string) => {
        setUserName(name);
    };

    return [userName, updateUserName];
}
