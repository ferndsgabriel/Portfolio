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
            className="overflow-y-auto h-24 resize-none w-full placeholder:text-blue-900 focus:placeholder:text-black outline-none border-b-1 py-2 border-blue-900 focus:border-black" 
            placeholder={placeholder}/>
        </div>
    )
}

export default memo(TextArea);