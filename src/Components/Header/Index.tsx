import {AiOutlineMenu,AiOutlineClose} from "react-icons/ai";
import {useRef} from "react";
import logo from "../../Assets/logo.svg";
import logoDark from "../../Assets/logoDark.svg";

const Header = () =>{
    
    const Logo = "{</>}Ferndsgabriel";
    const navRef = useRef <HTMLDivElement> (null);
    const headerRef = useRef <HTMLDivElement> (null);

    const openNav = ()=>{
        navRef.current?.classList.remove('hidden');
        navRef.current?.classList.add('flex');
    }
    
    const closeNav = () =>{        
        navRef.current?.classList.remove('flex');
        navRef.current?.classList.add('hidden');
    }
    
    window.addEventListener('keydown', (e)=>{
        if (e.key === 'Escape'){
            if (navRef.current?.classList.contains('flex') && window.innerWidth < 768){
                closeNav();
            }
        }else{
            return
        }
    })// fechar nav co esc

    window.addEventListener('click', (e)=>{
        const targetNode = e.target as Node;
        
        if (navRef.current?.classList.contains('flex') && window.innerWidth < 768){
            if (!headerRef.current?.contains(targetNode)){
                closeNav();
            }
            else{
                return
            }
        }
        else{
            return;   
        } // fechar nav clicando fora 

    })
    
    return(
        <>
            <header className=" w-full h-16 z-50 bg-white dark:bg-mainDark fixed top-0 md:hidden" ref={headerRef}>
                <div className="w-full max-w-4xl p-4 flex items-center justify-between mx-auto relative md:sticky">
                    <img src={logo} alt="logo"
                    className="w-36 dark:hidden"/>
                    <img src={logoDark} alt="logo"
                    className="w-36 hidden dark:block"/>
                    <nav className="flex items-center gap-4">
                        <button onClick={openNav} className="text-lg text-mainDark md:hidden">
                            <AiOutlineMenu/>
                        </button>
                        <div className="hidden absolute top-0 left-0 w-full bg-white flex-col items-center justify-between py-10 shadow-lg rounded-b-2xl md:flex md:sticky md:p-0 md:w-auto md:shadow-none md:bg-transparent dark:bg-mainDark dark:shadow-slate-950s"
                        ref={navRef}>
                            <button onClick={closeNav} className="text-2xl text-mainDark w-full p-4 flex items-center justify-center group md:hidden">
                                <AiOutlineClose className="group-hover:scale-125"/>
                            </button>
                            <ul className="text-center w-full flex flex-col items-center md:flex-row md:h-auto gap-4">
                                <li className="p-1 rounded-lg w-full hover:bg-light dark:hover:bg-black duration-300 cursor-pointer"><a className="font-bold block w-full h-full" href="#about">Sobre</a></li>
                                <li className="p-1 rounded-lg w-full hover:bg-light dark:hover:bg-black duration-300 cursor-pointer"><a className="font-bold block w-full h-full" href="#skills">Percurso</a></li>
                                <li className="p-1 rounded-lg w-full hover:bg-light dark:hover:bg-black duration-300 cursor-pointer"><a className="font-bold block w-full h-full" href="#projects">Projetos</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <div className="h-16 md:hidden"></div>
        </>
    )
}

export default Header;