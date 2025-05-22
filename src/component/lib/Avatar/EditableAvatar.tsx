"use client"

import { useFireBase } from "@/provider/FireBaseProvider";
import { setUserName } from "@/util/userNameStorage";
import { useState, useRef, useEffect } from "react";
import { Avatar } from "./Avatar";
import { ref, update } from "firebase/database";
import { update as updateJdenticon } from "jdenticon";

export const EditableAvatar: React.FC = () => {
    const { userId, roomId, database, state: { users } } = useFireBase();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const userName = users?.[userId]?.name || "";

    useEffect(() => {
        setEditedName(userName);
    }, [userName]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleNameClick = () => {
        setIsEditing(true);
        setEditedName(userName);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const handleNameBlur = () => {
        saveNameChange();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            saveNameChange();
        } else if (e.key === "Escape") {
            setIsEditing(false);
            setEditedName(userName);
        }
    };

    const saveNameChange = () => {
        if (editedName.trim() && editedName !== userName) {
            // Update in Firebase
            update(ref(database, `users/${roomId}/${userId}`), {
                name: editedName
            });

            // Save to local storage
            setUserName(editedName);
        }

        setIsEditing(false);
    };

    const editAvatarRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (isEditing && editAvatarRef.current) {
            updateJdenticon(editAvatarRef.current, userId);
        }
    }, [isEditing, userId]);

    if (isEditing) {
        return (
            <div className="flex items-center flex-row-reverse">
                <div className="h-10 w-10 border rounded-full overflow-hidden mx-4">
                    <svg ref={editAvatarRef} data-jdenticon-value={userId} height={38} width={38} />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={editedName}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    onKeyDown={handleKeyDown}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                    maxLength={30}
                />
            </div>
        );
    }

    return (
        <div onClick={handleNameClick} className="cursor-pointer">
            <Avatar id={userId} reverse />
        </div>
    );
};
