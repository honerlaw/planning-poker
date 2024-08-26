"use client"

import { useFireBase } from "@/provider/FireBaseProvider";
import { RoomUser } from "./RoomUser";

export const RoomUserList: React.FC = () => {
    const { state: { users } } = useFireBase()

    return (
        <div className="flex flex-col gap-6 border-y w-full py-4">
            {users && Object.keys(users).map((key) => {
                const user = users![key]
                return <RoomUser key={key} id={key} user={user.name} />
            })}
        </div>
    );
}