import { memo, type ReactNode } from "react"

interface linkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?:string;
    children:ReactNode;
}

function LinkUnderline({href, children,...rest}:linkProps){
    return(
        <div className="relative group w-fit">
            <span className="w-0 absolute -bottom-1 left-0 h-[2px] bg-white group-hover:w-full transition-all duration-500"></span>
            <a href={href} {...rest}>
                {children}
            </a>
        </div>
    )
}

export default memo(LinkUnderline);