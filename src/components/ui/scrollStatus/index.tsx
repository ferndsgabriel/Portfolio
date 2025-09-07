import { memo } from "react"
import { useBg } from "../../../contexts/bgColorContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function ScrollStatus (){

    const { scrollPercent } = useBg();
    const {t,  ready } = useTranslation("home");

    if (!ready) return null;
    
    return( 
        <div className="fixed bottom-0 right-0 lg:flex items-center gap-4 py-2 px-4 hidden">
            <span className="text-white">{t('components.scroll')}</span>

            <div className="flex items-center gap-2">
                <FaArrowLeft/>
                <div className="flex items-center w-64 relative">
                    {/* Linha sólida ocupando 50% */}
                    <span style={{width: `${scrollPercent}%`}} 
                    className="h-1 bg-white absolute"></span>

                    {/* Linha pontilhada com tamanho fixo */}
                    <span 
                    className="w-full border-t-4 border-dotted border-white/60"></span>
                </div>
                <FaArrowRight/>
            </div>
        </div>

    )
}

export default memo(ScrollStatus);