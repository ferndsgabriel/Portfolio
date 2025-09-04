import { memo, type ReactNode } from "react"
import { FaArrowRight } from "react-icons/fa";

interface LinkArrowProps {
    children: ReactNode;
}

function LinkArrow({ children }: LinkArrowProps) {
    return (
        <span className="flex items-center gap-4 font-semibold group">
            <FaArrowRight className="group-hover:-translate-x-2 transition-all duration-300" />
            <span>{children}</span>
        </span>
    )
}

export default memo(LinkArrow);
