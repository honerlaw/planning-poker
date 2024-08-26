"use client"

import { useFireBase } from "@/provider/FireBaseProvider";
import { update } from "jdenticon";
import { useEffect, useRef } from "react";
import c from "classnames"
import { nanoid } from "nanoid";

type AvatarProps = {
    id?: string
    name?: string
    reverse?: boolean // whether to show the name on the left or right
}

export const Avatar: React.FC<AvatarProps> = ({ id, name, reverse }) => {
    const icon = useRef(null);
    
    // fallback to the active user if there is one
    const { userId, state: { users }} = useFireBase()
    const idToHash = id || userId ||  nanoid()
    
    const userName = name || users?.[userId]?.name

    useEffect(() => {
        if (!icon.current) {
            return
        }
        update(icon.current, idToHash);
    }, [idToHash]);

    return <div className={c("flex items-center", {
            "flex-row": !reverse,
            "flex-row-reverse": reverse
        })}>
        <div className={"h-10 w-10 border rounded-full overflow-hidden mx-4"}>
            <svg data-jdenticon-value={idToHash} height={38} ref={icon} width={38} />
        </div>
        {userName && <label>{userName}</label>}
    </div>
}
