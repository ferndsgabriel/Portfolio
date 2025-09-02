import{ memo, useContext, useState } from "react"
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useBg } from "../../../contexts/bgColorContext";
import { useTranslation } from "react-i18next";
import changeLanguageContext from "../../../contexts/changeLanguageContext";
import LinkUnderline from "../LinkUnderline";

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
                        <li key={index}>
                            <LinkUnderline href={item.href}>
                                <span>{item.title}</span>
                            </LinkUnderline>
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
                <div className="w-full h-full mx-auto flex justify-between    items-center">
                    
                    <button onClick={toggleMenu} 
                    className="lg:hidden text-3xl self-start">
                        <RiMenu2Fill/>
                    </button>
                    
                    <ul className="lg:flex gap-12 h-full items-center hidden">
                        {renderList()}
                        <li>
                            <LinkUnderline>
                                <button onClick={changeLanguage}>PT/EN</button>
                            </LinkUnderline>
                        </li>
                    </ul>

                    <div className="bg-black h-full aspect-square rounded-sm overflow-hidden">
                        <img src="./logo.webp" alt="logo" className="w-full h-full object-contain"/>
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