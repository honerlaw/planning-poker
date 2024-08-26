import Image from "next/image"
import icon from "../../../app/icon.svg"
import Link from "next/link"
import { Avatar } from "../Avatar"

export const Header: React.FC = () => {
    return <header className={"border-b p-6"}>
        <div className="flex flex-row justify-between items-center">
            <Link href={"/"}>
                <div className="flex flex-row justify-center items-center">
                    <Image src={icon} alt="Planning Poker Icon" className="h-8 w-8 mr-6" />
                    Planning Poker
                </div>
            </Link>
            <Avatar reverse />
        </div>
    </header>
}
