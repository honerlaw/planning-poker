import React from "react"
import Link from "next/link"
import { nanoid } from "nanoid"

export const dynamic = 'force-dynamic'

export const LandingPage: React.FC = () => {
    return <div className="flex justify-center items-center h-screen">
        <Link href={`/room/poker/${nanoid()}`}>
            <button>Start Planning Poker</button>
        </Link>
    </div>
}
