import{ memo, useContext, useState } from "react"
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useBg } from "../../../contexts/bgColorContext";
import { useTranslation } from "react-i18next";
import changeLanguageContext from "../../../contexts/changeLanguageContext";

type Section = {
    title: string;
    href: string;
};

function Header(){
    const [isOpen, setIsOpen] = useState(false);
    const { bg } = useBg();
    const { t,  ready } = useTranslation("home");
    const {changeLanguage} = useContext(changeLanguageContext)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    const sections = t("header.sections", { returnObjects: true }) as Section[];

    const renderList = () =>{
        return(
                <>
                    {sections.map((item, index) => (
                        <li key={index} className="relative group w-fit">
                            <span className="w-0 absolute -bottom-1 left-0 h-[2px] bg-black group-hover:w-full transition-all duration-500"></span>
                            <a href={item.href}>{item.title}</a>
                        </li>
                    ))}
                </>
        )
    }



    if (!ready) return null;

    return(
        <>
            <header style={{ backgroundColor: bg, transition: 'background-color 0.3s linear' }}
            className="h-34 p-8 fixed w-full top-0 z-50">
                <div className="w-full h-full max-w-7xl mx-auto flex justify-between    items-center">
                    
                    <button onClick={toggleMenu} 
                    className="lg:hidden text-3xl self-start">
                        <RiMenu2Fill/>
                    </button>
                    
                    <ul className="lg:flex gap-12 h-full items-center hidden">
                        {renderList()}
                        <li className="relative group w-fit">
                            <span className="w-0 absolute -bottom-1 left-0 h-[2px] bg-black group-hover:w-full transition-all duration-500"></span>
                            <button onClick={changeLanguage}>PT/EN</button>
                        </li>
                    </ul>

                    <div className="bg-black h-full aspect-square rounded-sm overflow-hidden">
                        <img src="./public/logo.webp" alt="logo" className="w-full h-full object-contain"/>
                    </div>
                </div>
                
            </header>
            
            
            <nav style={{ backgroundColor: bg, transition: 'background-color 0.3s linear' }} 
            className={`fixed h-full w-full top-0 z-50 p-8 flex flex-col gap-16 text-2xl lg:hidden
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
            duration-300 transition-opacity`}>

                <button onClick={toggleMenu}>
                    <IoMdClose className="text-3xl"/>
                </button>

                <div className="w-full border-b-4 py-4">
                    <h2>Menu</h2>
                </div>

                <ul className="w-full flex flex-col gap-4 border-b-4 py-4">
                    {renderList()}
                </ul>
            </nav>
            
            <div className="h-34"></div>
        </>
    )
}

export default memo(Header);