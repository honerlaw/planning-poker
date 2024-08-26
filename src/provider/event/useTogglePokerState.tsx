import { ref, update } from "firebase/database";
import { useFireBase } from "../FireBaseProvider";
import { database } from "../util/database";


function getNextState(state: string) {
    switch (state) {
        case "waiting":
            return "voting"
        case "voting":
            return "results"
        case "results":
            return "waiting"
    }
}

export function useTogglePokerState() {
    const { roomId, state: { poker } } = useFireBase()

    return () => {
        if (!poker) {
            return
        }

        const pokerRoomRef = ref(database, `poker/${roomId}`)
        const nextState = getNextState(poker.state)
        
        update(pokerRoomRef, {
            state: nextState
        })

        // we are going back to waiting, so reset the votes
        if (nextState === "waiting") {
            update(pokerRoomRef, {
                votes: {}
            })
        }
    }
}
