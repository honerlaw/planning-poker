import { useSelectedCard } from "@/provider/event/useSelectedCard";
import { PokerCard } from "@/component/lib/PokerCard";
import { useFireBase } from "@/provider/FireBaseProvider";
import { Avatar } from "@/component/lib/Avatar";

type RoomUserProps = {
    id: string
    user: string
}

export const RoomUser: React.FC<RoomUserProps> = ({ id, user }) => {
    const selectedCard = useSelectedCard(id);
    const { userId, state: { poker } } = useFireBase()

    // when to show the card to everyone vs just myself
    const isMyUser = userId === id;
    const isResultsView = poker?.state === "results";
    const showCard = isMyUser || isResultsView

    return <div className="flex items-center gap-12 justify-between">
        <Avatar id={id} name={user} />
        <div>
            {selectedCard && showCard && <PokerCard small displayOnly selected label={selectedCard.card.displayName} />}
            {selectedCard && !showCard && <PokerCard small displayOnly selected label={"/"} />}
            {!selectedCard && <PokerCard small displayOnly label={"/"} />}
        </div>
    </div>
}