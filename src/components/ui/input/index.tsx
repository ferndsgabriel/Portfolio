import { memo } from "react"


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    name: string;
    placeholder: string
}

function Input ({name, placeholder, ...rest}:InputProps){
    return(
        <div className="flex flex-col gap-2 items-start w-full justify-start">
            <span className="text-white/50">{name}</span>
            <input {...rest} 
            className="border-white/50 focus:border-white w-full placeholder:text-white/80 focus:placeholder:text-transparent outline-none border-b-1 py-2" 
            placeholder={placeholder}/>
        </div>
    )
}

export default memo(Input);