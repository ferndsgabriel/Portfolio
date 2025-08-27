import { useEffect, useState, type FormEvent} from "react";
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
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

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

interface certificatesProps{
    title: string;
    image: string;
    description: string;
}

export default function Home (){
    const { bg } = useBg();
    const { setCustomScrollContainer } = useBg();
    const containerRef = useHorizontalScroll();
    const {t, ready} = useTranslation("home");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        setCustomScrollContainer(containerRef.current);
    }, [containerRef]);

    const projects = t("projects.projects", { returnObjects: true }) as projectsProps[];

    const skills = t("skills.skills", { returnObjects: true }) as skillsProps[];

    const contacts = t("contact", { returnObjects: true }) as contactsProps[];

    const certificates = t("certificates.certificates", { returnObjects: true }) as  certificatesProps[];



    const responsiveProjects = {
        2: {
            breakpoint: { max: 1024, min: 768 },
            items: 2
        },
        1: {
            breakpoint: { max: 768, min: 0 },
            items: 1
        }
    };

    const responsiveCertificates = {
        3: {
            breakpoint: { max: 99999, min: 860 },
            items: 3
        },
        2: {
            breakpoint: { max: 860, min: 600 },
            items: 2
        },
        1: {
            breakpoint: { max: 600, min: 0 },
            items: 1
        }
    };

    const renderProjects = () =>{
        return(
            projects.map((item, index) => (
                <div
                key={index}
                className="flex-none relative aspect-square lg:h-96 lg:w-96 rounded-sm overflow-hidden bg-white hover:translate-y-2 transition-all duration-300">
                    <div className="absolute inset-0">
                        <img
                        src={formatGoogleDriveUrl(item.image)}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
                        />
                    </div>

                    <div className="absolute inset-0 bg-black/30 p-6 flex flex-col gap-4 justify-end text-white">
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

    const renderCertificates = (item:certificatesProps, index:number)=>{
        return(
        <div 
        key={index} className={`bg-white aspect-square w-full relative shadow-lg border-2  overflow-hidden hover:rotate-0 hover:z-10 hover:scale-110 transition-all duration-300  border-neutral-200 lg:min-w-64 
            ${index % 2 === 0 ? '-rotate-6' : 'rotate-6'}`}>
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 p-2">
                <img src={formatGoogleDriveUrl(item.image)} alt={item.title} className="w-full h-full object-contain" />
            </div>
        </div>
        )
    }

    async function sendEmail(e:FormEvent){
        e.preventDefault();

        if (!name || !email || !message){
            toast.warning(t("modal-find-toast-2"));
            return;
        }

        setIsSending(true);
        
        const serviceId = import.meta.env.VITE_APP_SERVICE;
        const templateId = import.meta.env.VITE_APP_TEMPLATE;
        const publicKey = import.meta.env.VITE_APP_PUBLICKEY;
        
        emailjs.init(publicKey);
        
        const dataEmail = {
            Name:name,
            From:email,
            Message:message
        }
        
        await emailjs.send(serviceId, templateId,dataEmail).then(()=>{
            toast.success(t("sendEmail.success"));
        }).catch((error:any)=>{
            toast.error(t("sendEmail.error"));
            console.log(error)
        }).finally(()=>{
            setIsSending(false);
        })
    }

    if (!ready) return <Loading/>;

    return(
        <>
            <Header/>
            <main ref={containerRef} 
            style={{ backgroundColor: bg, transition: 'background-color 0.3s linear' }}
            className="p-8 md:px-16 flex flex-col gap-32 lg:gap-56 lg:flex-row lg:overflow-x-auto lg:h-[calc(100vh-8.5rem)]">
                
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
                        <Carousel responsive={responsiveProjects} showDots={true} itemClass="px-2" className="z-10">
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

                {/* certificates */}
                <section id="certificates" className="w-full flex flex-col gap-16 lg:w-fit">

                    {t("certificates.title") && (
                        <h2 className="text-2xl">{t("certificates.title")}</h2>
                    )}

                    <div className="hidden lg:block">
                        {certificates && certificates.length > 0 && (
                            <div className="flex items-center">
                                {certificates.map((item, index) => (
                                    <div 
                                    key={index} className={`hidden lg:flex bg-white aspect-square w-full relative shadow-lg border-2  overflow-hidden hover:rotate-0 hover:z-10 hover:scale-110 transition-all duration-300  border-neutral-200 lg:min-w-64 
                                        ${index % 2 === 0 ? '-rotate-6' : 'rotate-6'}`}>
                                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 p-2">
                                            <img src={formatGoogleDriveUrl(item.image)} alt={item.title} className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="block lg:hidden">
                        <Carousel responsive={responsiveCertificates} 
                        showDots={true} itemClass="px-2" className="z-10">                   
                            {certificates && certificates.length > 0 && (
                                    certificates.map((item, index) => (
                                        <div className="py-16 px-4" key={index}>
                                            {renderCertificates(item, index)}
                                        </div>
                                    ))
                            )}
                        </Carousel>
                    </div>


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

                    <form className="w-full flex flex-col gap-16 max-w-3xl" onSubmit={sendEmail}>
                        <div className="w-full grid grid-cols-1 gap-8 md:grid-cols-2">
                        
                            <div className="col-start-1 col-end-3 md:col-end-2">
                                <Input value={name} onChange={(e) => setName(e.target.value)} required
                                name={t("email.inputName")} placeholder={t("email.inputNamePlaceholder")}/>
                            </div>

                            <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} required
                                name={t("email.inputEmail")} placeholder={t("email.inputEmailPlaceholder")}/>
                            </div>

                            <div className="col-start-1 col-end-3">
                                <TextArea value={message} onChange={(e) => setMessage(e.target.value)} required
                                name={t("email.inputMessage")} placeholder={t("email.inputMessage")}/>
                            </div>
                        </div>

                        <Button disabled={isSending}>
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