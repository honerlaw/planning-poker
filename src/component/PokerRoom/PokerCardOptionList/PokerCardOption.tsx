import { PokerCard } from "@/component/lib/PokerCard"
import { useSelectCard } from "@/provider/event/useSelectCard"
import { useSelectedCard } from "@/provider/event/useSelectedCard"

type PokerCardOptionProps = {
    id: string
    name: string
}

export const PokerCardOption: React.FC<PokerCardOptionProps> = ({ id, name }) => {
    const selectCard = useSelectCard()
    const selectedCard = useSelectedCard()

    return <PokerCard label={name} selected={selectedCard?.id === id} onPress={() => selectCard(id)} />
}
