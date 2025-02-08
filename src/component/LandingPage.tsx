import React from "react"
import Link from "next/link"
import { nanoid } from "nanoid"
import { Header } from "./lib/Header"
import Image from "next/image"
import icon from "../app/icon.svg"

export const LandingPage: React.FC = () => {
    return <div className="flex flex-col h-screen">
        <Header showAvatar={false} />
        <div className="flex-1 flex flex-col items-center gap-12 justify-center">
            <Image src={icon} alt="Planning Poker Icon" className="h-16 w-16 mt-12" />
            <h1 className="text-4xl font-bold">Planning Poker</h1>
            <Link href={`/room/poker/${nanoid()}`}>
                <button className="rounded shadow hover:opacity-40 transition bg-black py-4 px-12 text-white font-bold">Create poker room</button>
            </Link>
            <div className="h-24" />
        </div>
    </div>
}
