import c from "classnames"

type PokerCardProps = {
    label? : string
    selected?: boolean
    displayOnly?: boolean // used to display as a div
    small?: boolean
    count?: number | string // if defined, show an indicator in the bottom right
    onPress?: () => void
}

const COMMON_STYLES = "border border-gray-900 bg-gray-100 text-gray-900 rounded m-2 flex justify-center items-center relative"

export const PokerCard: React.FC<PokerCardProps> = ({ label, selected, displayOnly, small, count, onPress }) => {
    const Element = displayOnly ? "div" : "button"
    const onClick = displayOnly ? undefined : onPress

    return <Element onClick={onClick} className={c(COMMON_STYLES, {
        "h-20 w-12": !small,
        "h-16 w-10": small,
        "opacity-30": !selected,
        "opacity-100": selected,
        "hover:opacity-100": !displayOnly
    })}>
        {label && <label>{label}</label>}
        {typeof count !== "undefined" && <label className="text-xs absolute bottom-[-15px] right-[-15px] h-[30px] w-[30px] bg-red-500 flex justify-center items-center rounded-full text-white">{count}</label>}
    </Element>
}