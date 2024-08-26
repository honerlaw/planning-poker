import { Header } from "@/component/lib/Header";
import { FireBaseProvider } from "@/provider/FireBaseProvider";
import { useMemoizedRandomName } from "@/util/getRandomName";
import { nanoid } from "nanoid";

type LayoutProps = React.PropsWithChildren<{ params: { id: string } }>

export const dynamic = 'force-dynamic'

export default function PageLayout({ params, children }: LayoutProps) {
    const userName = useMemoizedRandomName()
    return <FireBaseProvider roomId={params.id} userId={nanoid()} userName={userName}>
        <Header />
        <main>
            {children}
        </main>
    </FireBaseProvider>
}
