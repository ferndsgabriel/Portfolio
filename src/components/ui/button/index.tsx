import { memo } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}

function Button ({children, ...rest}:ButtonProps){
    return(
        <button {...rest} 
        className="w-full border-1 p-4 rounded-sm border-l-2 relative h-14 flex items-center justify-center group">
            <div className="absolute h-full w-0 top-0 left-0 h-g flex items-center justify-center bg-black group-hover:w-full transition-all duration-500"/>
            <div className="group-hover:text-white absolute">
                {children}
            </div>
        </button>
    )
}

export default memo(Button);