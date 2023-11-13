import Header from "../../Components/Header/Index";
import Eu from "../../Assets/eu.png";
import {AiOutlineRight, AiOutlineInstagram,AiFillHtml5, AiOutlineWhatsApp, AiOutlineSearch} from "react-icons/ai";
import {FaGithub,FaFigma} from "react-icons/fa";
import {GrLinkedinOption} from "react-icons/gr";
import {BiLogoJavascript, BiLogoCss3,
BiLogoReact,BiLogoNodejs,BiLogoTypescript,BiLogoSass,BiLogoTailwindCss, BiGitRepoForked} from "react-icons/bi";
import {TbBrandNextjs} from "react-icons/tb";
import p1 from "../../Assets/P (1).svg";
import p2 from "../../Assets/P (2).svg";
import p3 from "../../Assets/P (3).svg";
import pw1 from "../../Assets/PW (1).svg";
import pw2 from "../../Assets/PW (2).svg";
import pw3 from "../../Assets/PW (3).svg";
import { useRef, useEffect, useState, FormEvent } from "react";
import { Api } from "../../Services";
import {VscDebugBreakpointDataUnverified, VscDebugBreakpointData} from "react-icons/vsc";
import logo from "../../Assets/logo.svg";
import logoDark from "../../Assets/logoDark.svg";
import {  toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import emailjs from '@emailjs/browser';


function Home(){
    const section1LeftRef = useRef<HTMLDivElement>(null);
    const section1RightRef = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState('');
    const arrayScroll = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]; 
    const [scrollValue, setScrollValue] = useState(0);
    const [sectionIndex, setSectionIndex] = useState(0);
    const maxProjectInPage = 6
    const [maxProjects, setMaxProject] = useState ({first:0, last:maxProjectInPage});
    const [scrollIsButton, setScrollIsButton] = useState (true);
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);


    useEffect(() => {
        if (window.innerWidth > 768 && scrollIsButton){
            const handleScroll = () => {
                const newSectionIndex =
                    scrollValue < window.scrollY
                        ? Math.min(sectionIndex + 1, arrayScroll.length - 1)
                        : Math.max(sectionIndex - 1, 0);
        
                setSectionIndex(newSectionIndex);
                setScrollValue(window.scrollY);
                
                if (newSectionIndex === 0){
                    document.documentElement.scrollTop = 0;
                    arrayScroll[0].current?.classList.add('OpenLeft');
                }
                else{
                    arrayScroll[newSectionIndex].current?.scrollIntoView({ behavior: 'smooth' });
                }
                for(let x = 0; x < arrayScroll.length; x++){
                    if (x  === newSectionIndex){
                        arrayScroll[x].current?.classList.add('animate-OpenLeft');
                    }
                    else{
                        arrayScroll[x].current?.classList.remove('animate-OpenLeft');
                    }
                }
            };
            window.addEventListener('scroll', handleScroll);        
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }

    }, [scrollValue, sectionIndex, arrayScroll]);
    
    const buttonsMoreProject = () => {
        const buttons = []; 
        const maxButtons = Math.ceil(Api.length / maxProjectInPage); // estou dividindo o max que eu quero em uma pagina, pelo tamanho de projetos e retornando sempre arredondando pro maior
        for (let x = 0; x < maxButtons; x++) {
            buttons.push(
                <button
                key={x}
                className={`${maxProjectInPage * (x) === maxProjects.first ?'bg-main text-white':'bg-light'} rounded-full h-6 hover:scale-110 duration-300 aspect-square text-mainDark flex items-center justify-center`}
                onClick={() => setMaxProject({ first: maxProjectInPage * (x), last: maxProjectInPage * (x + 1) })}
                >{x+1}</button>
            );
            }
    
        return buttons;
    };

    const scrollButton = (value: number) => {
        setScrollIsButton(false);
        if (sectionIndex !== value) {

        const handleScrollEnd = () => {
            setSectionIndex(value);
            setScrollIsButton(true);
            window.removeEventListener('scroll', handleScrollEnd);
        };
    
        window.addEventListener('scroll', handleScrollEnd);
    
        arrayScroll[value].current?.scrollIntoView({
            behavior: 'smooth',
        });
        } else {
        setScrollIsButton(true);
        }
    };

    const handleEmail = (e:FormEvent)=>{
        e.preventDefault();
        if (emailRef.current?.value === '' && nameRef.current?.value === '' && messageRef.current?.value === ''){
            return;
        }
        if (emailRef.current?.value === '' || nameRef.current?.value === '' || messageRef.current?.value === ''){
            toast.warning('Digite todos os dados')
            return;
        }
        const emailValue = emailRef.current?.value ?? '';
        if (!isEmail(emailValue)) {
            toast.warning('Endereço de e-mail inválido');
        }
        const emailProps =  {
            id: process.env.REACT_APP_SERVICE_ID || '',
            template: process.env.REACT_APP_TEMPLATE_ID || '',
            key: process.env.REACT_APP_PUBLIC_KEY || ''
        };
        const emailData = {
            to: 'gabrielsilvafernandes1606@gmail.com',
            from: emailRef.current?.value || '',
            message:messageRef.current?.value || '',
            name:nameRef.current?.value || ''
        };
        
        emailjs.send(emailProps.id, emailProps.template, emailData, emailProps.key)
        .then((result) => {
            console.log(result.text);
            toast.success('Enviamos seu email :)')
        }, (error) => {
            console.log(error.text);
            toast.error('Houve um erro ao enviar seu email :(')
        });
    }

    return(
        <>  
            <Header/>
            <main className="w-full overflow-x-hidden">
                
                <section className="w-full html" ref={arrayScroll[0]} id="about">
                    <div className="w-full min-h-screen max-w-4xl mx-auto px-4 py-18 flex flex-col gap-8 md:flex-row justify-center md:items-center">
                        <div className="flex flex-col w-full" ref={section1LeftRef}>
                            <h1 className="font-bold text-lg uppercase">
                                <span className="text-main dark:text-mainLight">Gabriel</span> Fernandes</h1>
                            <h2 className="text-2xl">Desenvolvedor web</h2>
                            <p className="max-w-xs">
                                Eu sou o Gabriel, tenho 20 anos, sou residente em São Paulo e sou desenvolvedor web. Além disso, estou cursando Gestão da Tecnologia da Informação na FATEC.
                            </p>
                            <a className="bg-main self-start py-2 px-2 rounded-md text-white font-semibold mt-8
                            hover:scale-105 duration-300 flex items-center gap-2"
                            href="https://drive.google.com/file/d/1Fus93jmFPnWgnOt0DCYBqBoENwHgp3mF/view?usp=sharing" target="_blank">
                                Currículo <AiOutlineRight className="text-white"/>
                            </a>
                        </div>

                        <div className="w-full flex justify-between items-center md:flex-row-reverse md:w-80" ref={section1RightRef}>
                            <div className="flex flex-col items-center gap-4">
                                <a className="text-2xl hover:scale-110 duration-300"
                                href="https://github.com/ferndsgabriel" target="_blank">
                                    <FaGithub/></a>
                                <a className="text-2xl hover:scale-110 duration-300"
                                href="https://www.linkedin.com/in/ferndsgabriel/" target="_blank">
                                    <GrLinkedinOption/></a>
                                <a className="text-2xl hover:scale-110 duration-300"
                                href="https://www.instagram.com/ferndsgabriel/" target="_blank">
                                    <AiOutlineInstagram/></a>  
                                <a className="text-2xl hover:scale-110 duration-300"
                                href="https://api.whatsapp.com/send?phone=5511992751620&text=" target="_blank">
                                    <AiOutlineWhatsApp/></a>  
                            </div>
                            <img src={Eu} alt="Minha foto"
                            className="w-40 rounded-full select-none html"/>

                        </div>
                    </div>
                </section>

                {/*Section percurso*/}
                <section className="w-full bg-gray-400/50 OpenLeft min-h-screen dark:bg-main/50" ref={arrayScroll[1]}>
                    <div className="w-full max-w-4xl mx-auto px-4 py-12" id="skills scrollReveal"> 
                        <h1 className="font-bold uppercase text-lg mb-10">Percurso</h1>
                        <div className="flex flex-col gap-24">
                            
                            <div className="flex flex-col md:flex-row gap-4 w-full md:items-center md:justify-between scrollReveal">
                                <div className="flex gap-8 ">
                                    <img src={p1} alt='Pessoa andando'
                                    className="w-10 select-none dark:hidden"/>
                                    <img src={pw1} alt='Pessoa andando'
                                    className="w-10 select-none hidden dark:block"/>
                                    <div className="flex gap-6 self-end p-1">
                                        <i className="text-4xl"><AiFillHtml5/></i>
                                        <i className="text-4xl"><BiLogoCss3/></i>
                                        <i className="text-4xl"><BiLogoJavascript/></i>
                                    </div>
                                </div>
                                <p className=" md:block max-w-xs">
                                    Eu iniciei minha jornada começando pelos fundamentos: lógica, HTML, CSS e JavaScript.
                                </p>    
                            </div>

                            <div className="flex flex-col md:flex-row-reverse gap-4 w-full md:items-center md:justify-between scrollReveal">
                                <div className="flex gap-8">
                                    <img src={p3} alt='Pessoa Caindo'
                                    className="w-14 select-none dark:hidden"/>
                                    <img src={pw3} alt='Pessoa Caindo'
                                    className="w-14 select-none hidden dark:block"/>
                                    <div className="flex gap-6 self-end p-1">
                                        <i className="text-4xl"><BiLogoNodejs/></i>
                                        <i className="text-4xl"><BiLogoReact/></i>
                                        <i className="text-4xl"><TbBrandNextjs/></i>
                                        <i className="text-4xl"><BiLogoTypescript/></i>
                                    </div>
                                </div>
                                <p className="block md:block max-w-xs">
                                    Acabei caindo em um mundo repleto de ferramentas fascinantes que permitem realizar tarefas mais avançadas, aprimorando constantemente minhas capacidades. 
                                </p>    
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 w-full md:items-center md:justify-between scrollReveal">
                                <div className="flex gap-8">
                                    <img src={p2} alt='Pessoa curtindo'
                                    className="w-14 select-none dark:hidden"/>
                                    <img src={pw2} alt='Pessoa curtindo'
                                    className="w-14 select-none hidden dark:block"/>
                                    <div className="flex gap-6 self-end p-1">
                                        <i className="text-4xl"><BiLogoSass/></i>
                                        <i className="text-4xl"><BiLogoTailwindCss/></i>
                                        <i className="text-4xl"><FaFigma/></i>
                                        <i className="text-4xl"><BiGitRepoForked/></i>
                                    </div>
                                </div>
                                <p className="block md:block max-w-xs">
                                    Estava gostando da experiência e decidi aprofundar meus estudos, explorando tanto novas ferramentas quanto conceitos de design e o uso do Git.
                                </p>  
                            </div>
                        </div>
                    </div>
                </section>
                {/*section project */}
                <section ref={arrayScroll[2]} className="w-full min-h-screen" id="projects">
                    <div className="w-full max-w-4xl h-full mx-auto px-4 py-12 flex flex-col gap-4 scrollReveal">
                        <h1 className="font-bold uppercase text-lg">Projetos</h1>
                        <h2>Todos os projetos - {Api.length}</h2>
                        <label className="w-full max-w-xs flex items-center justify-between bg-light p-2 rounded cursor-pointer text-mainDark gap-1">
                            <input type="text" placeholder="Pesquise o projeto..."
                            className="bg-transparent  w-full" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                            <i><AiOutlineSearch className="text-mainLight"/></i>
                        </label>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {Api.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                            .slice(maxProjects.first, maxProjects.last)
                            .map((item) => (
                                <a href={`/details/${item.id}`} target="_blank"
                                key={item.id}className="w-full flex-shrink-0 flex flex-col gap-4 scrollReveal relative border border-black group">
                                    <img src={item.image} alt={`Foto do projeto ${item.image}`}
                                    className="w-full rounded"/>
                                    <div className="absolute w-full h-full flex flex-col items-center justify-center gap-4 bg-black/90 invisible md:group-hover:visible duration-200">
                                        <a href={`/details/${item.id}`}
                                        className="border-main border-solid  px-3 py-1 rounded-full flex items-center hover:bg-main text-white">Sobre</a>
                                        
                                        <a href={item.deploy} target="_blank"
                                        className="border-main border-solid  px-3 py-1 rounded-full flex items-center hover:bg-main text-white">Projeto <AiOutlineRight className="text-white"/></a>
                                    </div>
                                </a>
                                )
                            )}

                            </div>
                        <div className="flex w-full items-center justify-center gap-4 mt-16">
                        {buttonsMoreProject()}
                        </div>
                    </div>
                </section>
            </main>
            {/*Footer*/}
            <footer className="w-full min-h-screen bg-gray-500/30 dark:bg-main/50" ref={arrayScroll[3]}>
                <div className="w-full max-w-4xl min-h-screen mx-auto px-4 py-12 grid-cols-2  flex items-center justify-center flex-col gap-8 scrollReveal">
                <h2 className="font-bold uppercase text-lg self-start md:hidden">Eviar e-mail</h2>
                    <img src={logo} alt="logo"
                    className="hidden md:block md:dark:hidden w-96 select-none"/>
                    <img src={logoDark} alt="logo"
                    className="hidden md:dark:block w-96 select-none"/>

                    <form className="flex flex-col w-full gap-4 md:grid border-solid border-b-1 border-mainDark py-10 scrollReveal"onSubmit={handleEmail}>
                        <input type="text" ref={emailRef} className="border-y-0 border-solid border-b-1 border-x-0 border-main dark:border-white bg-transparent rounded h-14 p-2  focus:border-b-2 focus:border-x-2
                        row-start-1 row-end-2 col-start-1 col-end-2" placeholder="Digite seu e-mail:"/>

                        <input type="text" ref={nameRef} className="border-y-0 border-solid border-b-1 border-x-0 border-main dark:border-white bg-transparent rounded h-14 p-2  focus:border-b-2 focus:border-x-2
                        row-start-1 row-end-2 col-start-2 col-end-3" placeholder="Digite seu nome:"/>

                        <textarea ref={messageRef} className='h-56 border-y-0 border-solid border-b-1 border-x-0 border-main dark:border-white bg-transparent rounded p-2  focus:border-b-2 focus:border-x-2 resize-none
                        col-start-1 col-end-3 md:h-28' maxLength={400} placeholder="Digite a mensagem..."/>

                        <button type="submit" className="bg-main p-3 rounded text-white uppercase font-bold hover:bg-mainLight
                        dark:bg-mainDark duration-300 md:w-40">Enviar</button>
                    </form>

                    <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between scrollReveal">
                        <a className="text-xs md:hover:scale-110 duration-300" target="blank" href="https://www.instagram.com/ferndsgabriel/">
                            <strong>Instagram:</strong> ferndsgabriel
                        </a>
                        <a className="text-xs md:hover:scale-110 duration-300" target="blank" href="https://api.whatsapp.com/send?phone=5511992751620&text=">
                            <strong>Whatsapp:</strong> (11)99275-1620
                        </a>
                        <a className="text-xs md:hover:scale-110 duration-300" target="blank" href="tel:11 992751620">
                            <strong>Ligar:</strong> (11)99275-1620
                        </a>
                        <a className="text-xs md:hover:scale-110 duration-300" target="blank" href="https://www.linkedin.com/in/ferndsgabriel/">
                            <strong>Linkedin:</strong> ferndsgabriel
                        </a>
                        <a className="text-xs md:hover:scale-110 duration-300" target="blank" href="https://github.com/ferndsgabriel">
                            <strong>Github:</strong> ferndsgabriel
                        </a>
                    </div>
                    <span className="font-bold mt-16 self-start">&copy; Gabriel Fernandes 2023 </span>
                </div>
            </footer>
            

            {/*buttons laterais*/}
            <span className="fixed right-4 bottom-16 hidden md:flex flex-col items-center">
                    {arrayScroll.map((item,index)=>{
                        return(
                            index === sectionIndex ?(
                                <button><VscDebugBreakpointData className="text-4xl"
                                onClick={()=>scrollButton(index)} key={index}/></button>
                            ):(
                                <button><VscDebugBreakpointDataUnverified className="text-4xl animate-pulse"
                                onClick={()=>scrollButton(index)} key={index}/></button>
                            )
                        )
                    })}
            </span> 
            
        </>
    )
}

export default Home;