"use client"
import { useTogglePokerState } from "@/provider/event/useTogglePokerState";
import { useFireBase } from "@/provider/FireBaseProvider";
import c from "classnames"
import { Summary } from "./Summary";

export const Results: React.FC = () => {
    const { state: { poker } } = useFireBase()
    const togglePokerState = useTogglePokerState()

    if (!poker) {
        return null
    }

    return (<>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-xl">Overview</h1>
                <button
                    className={c("px-4 py-2 rounded", {
                        "bg-yellow-300": poker.state === "waiting",
                        "bg-red-300": poker.state === "results",
                        "bg-green-300": poker.state === "voting"
                    })}
                    onClick={() => togglePokerState()}>
                        {poker.state === "waiting" ? "Start voting" : poker.state === "voting" ? "Show results" : poker.state === "results" ? "Reset" : "Unknown"}
                </button>
            </div>
            <Summary />

        </>
    );
}