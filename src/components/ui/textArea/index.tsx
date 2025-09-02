import { memo } from "react"


interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string;
    placeholder: string
}

function TextArea ({name, placeholder, ...rest}:TextAreaProps){
    return(
        <div className="flex flex-col gap-2 items-start w-full justify-start">
            <span className="opacity-50">{name}</span>
            <textarea {...rest} 
            className="overflow-y-auto h-24 resize-none border-white/50 focus:border-white w-full placeholder:text-white/80 focus:placeholder:text-transparent outline-none border-b-1 py-2" 
            placeholder={placeholder}/>
        </div>
    )
}

export default memo(TextArea);