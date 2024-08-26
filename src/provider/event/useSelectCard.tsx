import { ref, update } from "firebase/database";
import { useFireBase } from "../FireBaseProvider";

export function useSelectCard() {
    const { database, roomId, userId } = useFireBase()

    return (cardId: string) => {
        update(ref(database, `poker/${roomId}/votes/${userId}`), {
            cardId
        })
    }
}
