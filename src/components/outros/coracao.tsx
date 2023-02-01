import { MiscContext } from '@/utils/context/miscContext';
import { useContext } from 'react';

interface iParametros {
    isCurtido: boolean;
}

export default function Coracao({ isCurtido }: iParametros) {

    const miscContext = useContext(MiscContext); // Contexto misc;
    const [isModoDark, setIsModoDark] = [miscContext?.isModoDarkContext[0], miscContext?.isModoDarkContext[1]];

    return (
        <div
            className={`
                coracao 
                ${(isCurtido && 'coracaoAnimar')} 
                ${(!isCurtido && (isModoDark ? 'coracaoFiltroBranco' : 'coracaoFiltroPreto'))}
                ${(!isCurtido && (isModoDark ? 'coracaoFiltroPretoHover' : 'coracaoFiltroBrancoHover'))}
            `}
        >
        </div>
    )
}