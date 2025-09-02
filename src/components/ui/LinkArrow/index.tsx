import { memo, type ReactNode } from "react"
import { FaArrowRight } from "react-icons/fa";

interface linkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?:string;
    children:ReactNode;
}

function LinkArrow({href, children, ...rest}:linkProps){
    return(
        <a target="_blank" href={href} className="flex items-center gap-4 font-semibold group" {...rest}>
            <FaArrowRight className="group-hover:-translate-x-2 transition-all duration-300"/>
            <span>
                {children}
            </span>
        </a>
    )
}

export default memo(LinkArrow);