"use client"

import { PokerCard } from "@/component/lib/PokerCard"
import { useFireBase } from "@/provider/FireBaseProvider"
import { useMemo } from "react"

function usePlaceholder() {
    const { state: { poker } } = useFireBase()

    // if not in the results state or no votes, show a placeholder
    return !poker || poker.state !== "results" || Object.keys(poker.votes).length === 0
}

const Average: React.FC = () => {
    const { state: { poker } } = useFireBase()
    const placeholder = usePlaceholder()

    const value = useMemo(() => {
        if (placeholder) {
            return "?"
        }
        const votes = Object.keys(poker!.votes).map((key) => {
            return poker!.cards[poker!.votes[key].cardId]
        })
        const sum = votes.reduce((acc, card) => {
            // infinity is special, so don't average it
            if (card.value === -1) {
                return 0
            }
            return acc + card.value
        }, 0)

        return Math.round(sum / votes.length)
    }, [placeholder, poker])

    return <div className="text-xl rounded-full h-16 w-16 flex justify-center items-center border border-slate-900">{value}</div>
}

const PokerCardVoteList: React.FC = () => {
    const { state: { poker } } = useFireBase()
    const placeholder = usePlaceholder()

    const cards = useMemo(() => {
        if (placeholder) {
            return []
        }

        // all of the cards that were voted for
        const cards = Object.keys(poker!.votes).map((key) => {
            const card = poker!.cards[poker!.votes[key].cardId]
            return {
                id: poker!.votes[key].cardId,
                ...card
            }
        })

        type CardType = typeof cards[0] & {
            count: number
        }

        return cards.map((card): CardType => {
            return {
                ...card,
                count: cards.filter((c) => c.id === card.id).length
            }
        }).reduce((accumulator, current) => {
            if (!accumulator.find((item) => item.id === current.id)) {
              accumulator.push(current);
            }
            return accumulator;
          }, [] as CardType[]).sort((a, b) => {
            return a.value - b.value
          })
    }, [placeholder, poker])

    if (placeholder || cards.length === 0) {
        return <div className="flex flex-row gap-2 justify-center items-center">
            <PokerCard label="0" displayOnly selected={false} count={"?"} />
        </div>
    }

    return <div className="flex flex-row gap-2 justify-center items-center">
        {cards.map((card) => {
            return <PokerCard key={card.id} label={card.displayName} displayOnly selected count={card.count} />
        })}
    </div>

}

export const Summary: React.FC = () => {
    return <div className="flex flex-row gap-10 justify-center items-center">
        <Average />
        <div className="w-[1px] h-24 bg-gray-200" />
        <PokerCardVoteList />
    </div>
}