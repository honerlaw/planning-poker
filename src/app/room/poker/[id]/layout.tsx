"use client"

import { Header } from "@/component/lib/Header";
import { FireBaseProvider } from "@/provider/FireBaseProvider";
import { getUserName, getUserId, setUserId, setUserName } from "@/util/userNameStorage";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

type LayoutProps = React.PropsWithChildren<{ params: { id: string } }>

export const dynamic = 'force-dynamic'

export default function PageLayout({ params, children }: LayoutProps) {
    const [userId, setUserIdState] = useState<string>("");
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const storedUserId = getUserId();
        const newUserId = storedUserId || nanoid();
        if (!storedUserId) {
            setUserId(newUserId);
        }
        setUserIdState(newUserId);

        const storedUserName = getUserName();
        setUserName(storedUserName);
    }, []);

    if (!userId || !userName) {
        return null;
    }

    return <FireBaseProvider roomId={params.id} userId={userId} userName={userName}>
        <Header />
        <main>
            {children}
        </main>
    </FireBaseProvider>
}
