"use client"

import React, { useEffect, useState } from "react";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { database } from "./util/database";

type FireBaseState = {
    rooms: {
        [roomId: string]: {
            users: {
                [userId: string]: {
                    active: boolean // will always be true for now
                }
            }
        }
    }
    users: {
        [userId: string]: {
            name: string // randomly generated name of the user
        }
    }
    poker: {
        [roomId: string]: {
            state: string // state of the game: "waiting", "voting", "results"
            cards: {
                [cardId: string]: {
                    index: number // used for ordering the data (e.g. which card should be displayed first vs last)
                    displayName: string // what to render on the card
                    value: number // the number on the card (e.g. 0, .5, 1, 2, 3, 5, 8, 13, 20, 40, 100, ∞)
                }
            }
            votes: {
                [userId: string]: {
                    cardId: string // the id of the card above that the user selected
                }
            }
        }
    }
}

const INITIAL_POKER_STATE: FireBaseState['poker'][string] = {
    state: "waiting",
    cards: {
        '0': {
            index: 0,
            displayName: "0",
            value: 0
        },
        'half': {
            index: 1,
            displayName: ".5",
            value: .5
        },
        '1': {
            index: 2,
            displayName: "1",
            value: 1
        },
        '2': {
            index: 3,
            displayName: "2",
            value: 2
        },
        '3': {
            index: 4,
            displayName: "3",
            value: 3
        },
        '5': {
            index: 5,
            displayName: "5",
            value: 5
        },
        '8': {
            index: 6,
            displayName: "8",
            value: 8
        },
        '13': {
            index: 7,
            displayName: "13",
            value: 13
        },
        '20': {
            index: 8,
            displayName: "20",
            value: 20
        },
        '40': {
            index: 9,
            displayName: "40",
            value: 40
        },
        '100': {
            index: 10,
            displayName: "100",
            value: 100
        },
        'Infinity': {
            index: 11,
            displayName: "∞",
            value: -1 // use a negative number for infinity
        }
    },
    votes: {}
}

type FireBaseContextProps = {
    database: typeof database
    roomId: string
    userId: string
    state: {
        room: FireBaseState['rooms'][string] | null
        users: FireBaseState['users'] | null
        poker: FireBaseState['poker'][string] | null
    }
}

const FireBaseContext = React.createContext<FireBaseContextProps | null>(null)

type FireBaseProviderProps = React.PropsWithChildren<{
    roomId: string
    userId: string
    userName: string
}>

export const FireBaseProvider: React.FC<FireBaseProviderProps> = ({ roomId, userId, userName, children }) => {
    const [roomState, setRoomState] = useState<FireBaseState['rooms'][string] | null>(null)
    const [userState, setUserState] = useState<FireBaseState['users'] | null>(null)
    const [pokerState, setPokerState] = useState<FireBaseState['poker'][string] | null>(null)

    // handle presence related logic / joining the room / setting up the user
    useEffect(() => {
        // get the room state when it changes
        const roomRef = ref(database, `rooms/${roomId}`);
        const roomRefUnSub = onValue(roomRef, (snapshot) => setRoomState(snapshot.val()), console.log);

        // get the user state when it changes
        const usersRef = ref(database, `users`);
        const userRefUnSub = onValue(usersRef, (snapshot) => setUserState(snapshot.val()), console.log);

        // get the state for the poker game when it changes
        const pokerRef = ref(database, `poker/${roomId}`);
        const pokerRefUnSub = onValue(pokerRef, (snapshot) => {
            const poker = snapshot.val()
            if (poker !== null) {
                setPokerState(poker)
                return
            }

            // set the initial poker state since it is not defined above
            set(ref(database, `poker/${roomId}`), INITIAL_POKER_STATE)
        }, console.log);

        // add to the users table
        set(ref(database, `users/${userId}`), {
            name: userName
        })

        // delete our user on disconnect
        const userRef = ref(database, `users/${userId}`);
        onDisconnect(userRef).remove()

        // add to the room
        set(ref(database, `rooms/${roomId}/users/${userId}`), {
            active: true
        })

        // remove the same user from the room as well on disconnect
        const userRoomRef = ref(database, `rooms/${roomId}/users/${userId}`);
        onDisconnect(userRoomRef).remove()

        // also remove our vote from the poker game
        const voteRef = ref(database, `poker/votes/${userId}`);
        onDisconnect(voteRef).remove()

        return () => {
            roomRefUnSub()
            userRefUnSub()
            pokerRefUnSub()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // okay now we need a way to update the database that abstracts away the firebase logic
    // but otherwise this works and we don't need a service

    return <FireBaseContext.Provider value={{
        database,
        roomId,
        userId,
        state: {
            room: roomState,
            users: userState,
            poker: pokerState
        },
    }}>
        {children}
    </FireBaseContext.Provider>
}

export function useFireBase() {
    const context = React.useContext(FireBaseContext)
    if (!context) {
        throw new Error('useFireBase must be used within a FireBaseProvider')
    }
    return context
}