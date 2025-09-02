import { memo } from "react"
import { useBg } from "../../../contexts/bgColorContext";

function ScrollStatus (){

    const { scrollPercent } = useBg();


    return( 
        <div className="fixed bottom-0 right-0 flex items-center gap-4 p-8d">
            <span className="text-white">Scroll for more</span>

            <div className="flex items-center w-64 relative">
                {/* Linha sólida ocupando 50% */}
                <span style={{width: `${scrollPercent}%`}} 
                className="h-1 bg-white absolute"></span>

                {/* Linha pontilhada com tamanho fixo */}
                <span 
                className="w-full border-t-4 border-dotted border-white"></span>
            </div>
        </div>

    )
}

export default memo(ScrollStatus);