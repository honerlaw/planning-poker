import { useFireBase } from "../FireBaseProvider"

export function useSelectedCard(userId?: string) {
    const { userId: myUserId, state } = useFireBase()

    const vote = state.poker?.votes?.[userId || myUserId]

    if (!vote) {
        return null
    }

    const card = state.poker?.cards?.[vote.cardId]
    if (!card) {
        return null
    }

    return {
        id: vote.cardId,
        card
    }
}