"use client"

import { useFireBase } from "@/provider/FireBaseProvider"
import { PokerCardOption } from "./PokerCardOption"

export const PokerCardOptionList: React.FC = () => {
    const { state: { poker } } = useFireBase()

    if (!poker) {
        return null
    }

    return <div className="flex">
        {Object.keys(poker.cards).map((key) => {
            return {
                key,
                card: poker.cards[key]
            }
        }).sort((a, b) => a.card.index - b.card.index).map((card) => {
            return <PokerCardOption key={card.key} id={card.key} name={card.card.displayName} />
        })}
    </div>
}
