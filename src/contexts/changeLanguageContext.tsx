import { createContext, useEffect, useState } from "react";
import i18n from "../i18n";
import Loading from "../components/ui/loading";


type changeLanguageContextType = {
    changeLanguage: () => void;
    language: string
}

interface changeLanguageProviderProps{
    children: React.ReactNode
}

const changeLanguageContext = createContext<changeLanguageContextType>({
    changeLanguage: () => {},
    language: "br"
});

export const ChangeLanguageProvider = ({children}:changeLanguageProviderProps) =>{
    const [language, setLanguage] = useState(localStorage.getItem("Language") || "br");
    const [loading, setLoading] = useState(true);

    const getLanguage = () => {
        const storedLanguage = localStorage.getItem("Language");
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
            setLanguage(storedLanguage);
        }
        setLoading(false);
    }

    useEffect(() => {
        setTimeout(()=>{
            getLanguage();
        },1500)
        
    },[]);

    const changeLanguage = () =>{
        if (language === "br") {
            localStorage.setItem("Language", "en");
            setLanguage("en");
            i18n.changeLanguage("en");
        } else {
            localStorage.setItem("Language", "br");
            setLanguage("br");
            i18n.changeLanguage("br");
        }
    }

    if (loading){
        return <Loading/>
    }

    return(
        <changeLanguageContext.Provider value={{changeLanguage, language}}>
            {children}
        </changeLanguageContext.Provider>
    )
}

export default changeLanguageContext