import { memo } from "react"


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    name: string;
    placeholder: string
}

function Input ({name, placeholder, ...rest}:InputProps){
    return(
        <div className="flex flex-col gap-2 items-start w-full justify-start">
            <span className="opacity-50">{name}</span>
            <input {...rest} 
            className="w-full placeholder:text-blue-900 focus:placeholder:text-black outline-none border-b-1 py-2 border-blue-900 focus:border-black" 
            placeholder={placeholder}/>
        </div>
    )
}

export default memo(Input);