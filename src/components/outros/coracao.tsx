import { MiscContext } from '@/utils/context/miscContext';
import { useContext } from 'react';

interface iParametros {
    isCurtido: boolean;
}

export default function Coracao({ isCurtido }: iParametros) {

    const miscContext = useContext(MiscContext); // Contexto do modo dark;
    const [isModoDark, setIsModoDark] = [miscContext?.isModoDarkContext[0], miscContext?.isModoDarkContext[1]];

    return (
        <div className={`coracao ${(isCurtido && 'coracaoAnimar')} ${(!isCurtido && (isModoDark ? 'coracaoFiltroBranco' : 'coracaoFiltroPreto'))}`}></div>
    )
}