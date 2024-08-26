import { Results, RoomUserList, PokerCardOptionList } from "@/component/PokerRoom"
import React from "react"

export default function RoomPage() {
  return <div className="flex justify-center items-center h-full my-8">
    <div className="flex flex-col justify-center items-center gap-8">
        <Results />
        <RoomUserList />
        <PokerCardOptionList />
    </div>
  </div>
}
