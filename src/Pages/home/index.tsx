import { useEffect} from "react";
import Header from "../../components/ui/header"
import { useBg } from "../../contexts/bgColorContext";
import { useHorizontalScroll } from "../../utils/scrollYtoX";
import { FaArrowRight } from "react-icons/fa";
import formatGoogleDriveUrl from "../../utils/driverUrl";
import { GiFlameSpin } from "react-icons/gi";
import 'react-multi-carousel/lib/styles.css';
import Carousel from "react-multi-carousel";
import Input from "../../components/ui/input";
import TextArea from "../../components/ui/textArea";
import Button from "../../components/ui/button";
import { LuMoveRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import Loading from "../../components/ui/loading";


interface contactsProps{
    title: string;
    href: string;
}

interface projectsProps{
    title: string;
    image: string;
    description: string;
    link: string;
}

interface skillsProps{
    title: string;
    image: string;
}

export default function Home (){
    const { bg } = useBg();
    const { setCustomScrollContainer } = useBg();
    const containerRef = useHorizontalScroll();
    const {t, ready} = useTranslation("home");

    useEffect(() => {
        setCustomScrollContainer(containerRef.current);
    }, [containerRef]);

    const projects = t("projects.projects", { returnObjects: true }) as projectsProps[];

    const skills = t("skills.skills", { returnObjects: true }) as skillsProps[];

    const renderProjects = () =>{
        return(
            projects.map((item, index) => (
                <div
                key={index}
                className="flex-none relative aspect-square lg:h-96 lg:w-96 rounded-sm overflow-hidden bg-white hover:scale-90 transition-all duration-300">
                    <div className="absolute inset-0">
                        <img
                        src={formatGoogleDriveUrl(item.image)}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
                        />
                    </div>

                    <div className="absolute inset-0 bg-black/40 p-6 flex flex-col gap-4 justify-end text-white">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-xs">{item.description}</p>
                        <a
                        target="_blank"
                        href={item.link}
                        className="flex items-center gap-2 font-semibold text-sm group"
                        >
                        <FaArrowRight className="group-hover:-translate-x-2 transition-all duration-300" />
                        {t("projects.go") && <span>{t("projects.go")}</span>}
                        </a>
                    </div>
                </div>
            ))
        )
    }

    const responsive = {
        2: {
            breakpoint: { max: 1024, min: 768 },
            items: 2
        },
        1: {
            breakpoint: { max: 768, min: 0 },
            items: 1
        }
    };

    const contacts = t("contact", { returnObjects: true }) as contactsProps[];

    if (!ready) return <Loading/>;

    return(
        <>
            <Header/>
            <main ref={containerRef} 
            style={{ backgroundColor: bg, transition: 'background-color 0.3s linear' }}
            className="p-8 flex flex-col gap-32 lg:gap-56 lg:flex-row lg:overflow-x-auto lg:h-[calc(100vh-8.5rem)]">
                
                {/* about */}
                <section id="about" 
                className="w-full flex flex-col gap-16 lg:min-w-lg">

                    {t("about.title") && (
                        <h1 className="text-2xl"
                            dangerouslySetInnerHTML={{ __html: t("about.title") }}
                        />
                    )}

                    {t("about.description") && (
                        <p>{t("about.description")}</p>
                    )}
                    

                    {contacts && contacts.length > 0 && (
                        <div>
                            {contacts.map((item, index) => (
                                <div key={index}>
                                    <a target="_blank" 
                                    href={item.href} className="flex items-center gap-4 font-semibold group">
                                        <FaArrowRight className="group-hover:-translate-x-2 transition-all duration-300"/>
                                        <span>{item.title}</span>
                                    </a>
                                    
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                

                {/* projects */}
                <section id="projects" className="w-full lg:w-fit flex flex-col gap-4 ">
                    
                    {t("projects.title") && (
                        <h2 className="text-2xl self-start just">{t("projects.title")}</h2>
                    )}

                    <div className="w-auto lg:hidden">
                        <Carousel responsive={responsive} showDots={true} itemClass="px-2">
                            {renderProjects()}
                        </Carousel>
                    </div>

                    <div className="items-center justify-center gap-4 hidden lg:flex">
                        {renderProjects()}
                    </div>
                </section>


                {/* skills */}
                <section id="skills" className="w-full flex flex-col gap-16">

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <GiFlameSpin className="opacity-50 animate-spin"/>
                            {t("skills.title") && (
                                <p>{t("skills.title")}</p>
                            )}
                            
                        </div>
                        
                        {t("skills.title2") && (
                            <h2 className="text-2xl uppercase font-semibold">{t("skills.title2")}</h2>
                        )}
                        
                    </div>
                    
                    {skills && skills.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-between lg:w-5xl lg:grid-cols-5 lg:gap-8">
                            {skills.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <img className="w-12 drop-shadow-lg" 
                                    src={formatGoogleDriveUrl(item.image)} alt={item.title} />
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>


                {/*contact*/}
                <section id="contact" className="flex flex-col gap-8  items-center  lg:min-w-screen">
                    
                    <div className="flex flex-col gap-4 text-center">
                        {t("email.title") && (
                            <h2 className="font-semibold text-2xl ">{t("email.title")}</h2>
                        )}
                        
                        {t("email.description") && (
                            <p className=" max-w-sm">{t("email.description")}</p>
                        )}
                    </div>

                    <form className="w-full flex flex-col gap-16 max-w-3xl">
                        <div className="w-full grid grid-cols-1 gap-8 md:grid-cols-2">
                        <Input name={t("email.inputName")} placeholder={t("email.inputNamePlaceholder")}/>
                        <Input name={t("email.inputEmail")} placeholder={t("email.inputEmailPlaceholder")}/>
                            <div className="col-start-1 col-end-3">
                            <TextArea name={t("email.inputMessage")} placeholder={t("email.inputMessage")}/>
                            </div>
                        </div>
                        <Button>
                            <div className="flex items-center gap-2 font-semibold">
                                <p>{t("email.button")}</p>
                                <LuMoveRight className="text-2xl"/>
                            </div>
                        </Button>
                    </form>
                </section>

            </main>
            
        </>
    )
}