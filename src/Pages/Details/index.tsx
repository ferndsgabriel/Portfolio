import { Api } from "../../Services";
import { useParams } from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import {AiOutlineRight, AiOutlineLeft, AiFillGithub} from 'react-icons/ai';

function Details(){
    const { id } = useParams();
    const [indexProject, setIndexProject] = useState <number>(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollIsZero, setScrollIsZero] = useState(false); 

    useEffect(()=>{
        for (var x = 0; x < Api.length; x++){
            if (Api[x].id === id){
                setIndexProject(x);
            }
        }    
    },[Details]);

    const scrollMoreProjects = (value:number)=>{
        scrollRef.current?.scrollBy({
            left:value,
            behavior:'smooth'
        });
        scrollLeftIsMoreZero()
    }
    useEffect(()=>{
        scrollLeftIsMoreZero();
    },[scrollRef, scrollIsZero]);

    const scrollLeftIsMoreZero = ()=>{
        let scrollValue = scrollRef.current?.scrollLeft?? 0;
        if (scrollValue > 0){
            setScrollIsZero(true);
        }else{
            setScrollIsZero(false);
        }
    }

    
    return(
        <>
            <main className="w-full h-full">
                <section className='w-full max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center px-4 py-6 gap-8'>
                    <a href="/"
                    className="self-start text-xl bg-light shadow-lg p-1 rounded-full hover:scale-110 duration-300 dark:bg-black"><AiOutlineLeft /></a>
                    
                    <div className="flex flex-col items-center justify-center mx-auto gap-2">
                        <img src={Api[indexProject].image} alt={`Projeto ${Api[indexProject].name}`}
                        className="w-full rounded"/>
                        <h1 className="self-start font-bold uppercase">{Api[indexProject].name}</h1>
                        <p className="text-sm max-h-[96px] overflow-auto px-1 scroll block">{Api[indexProject].about}</p>
                        <div className="self-start flex items-center gap-4 mt-4">
                            <a className="bg-light shadow-lg font-semibold py-2 px-4 rounded hover:scale-110 duration-300 dark:bg-black flex items-center justify-center gap-1" href={Api[indexProject].deploy} target="_blank" >Projeto <AiOutlineRight/></a>
                            <a className="bg-light shadow-lg font-semibold py-2 px-4 rounded hover:scale-110 duration-300 dark:bg-black flex items-center justify-center gap-1" href={Api[indexProject].git} target="_blank">GitHub <AiFillGithub/></a>
                        </div>
                    </div>

                    <div className="relative">
                        <article className="w-full flex overflow-auto items-center gap-4" ref={scrollRef}>
                            {Api.map((item, index)=>{
                                return(
                                    <a href={`/details/${item.id}`} key={index} className="flex-shrink-0 overflow-hidden group rounded">
                                        <img src={item.image} alt={`Projeto ${item.name}`}
                                        className="w-72  group-hover:scale-150 duration-300"/>
                                    </a>
                                )
                            })}
                        </article>
                        {scrollIsZero?(
                        <button onClick={()=>scrollMoreProjects(-200)}
                        className="bg-black/70 rounded-full p-1 absolute top-1/2 -translate-y-1/2 left-0"><AiOutlineLeft className="text-white"/></button>  
                        ):(null)}
                        
                        <button onClick={()=>scrollMoreProjects(200)}
                        className="bg-black/70 rounded-full p-1 absolute top-1/2 -translate-y-1/2 right-0"><AiOutlineRight className="text-white"/></button>
                    </div>
                </section>



            </main>
        </>
    )
}

export default Details;