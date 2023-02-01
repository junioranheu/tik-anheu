import Lupa from '@/components/svg/lupa';
import { MiscContext } from '@/utils/context/miscContext';
import { Dispatch, useContext } from 'react';
import Styles from './../styles/filtros.module.scss';

interface iParametros {
    topicoBuscado: string | null;
    setTopicoBuscado: Dispatch<string>;
}

export default function FiltrosInput({ topicoBuscado, setTopicoBuscado }: iParametros) {

    const modoDarkContext = useContext(MiscContext); // Contexto misc;
    const [isModoDark, setIsModoDark] = [modoDarkContext?.isModoDarkContext[0], modoDarkContext?.isModoDarkContext[1]];

    return (
        <div className={Styles.divPesquisa}>
            <input
                className={Styles.inputPesquisaNavbar}
                type='text'
                placeholder='Procure por um tópico como "gato" ou "cachorro", por exemplo'
                onChange={(e) => setTopicoBuscado(e.target.value)}
                value={topicoBuscado ?? ''}
            />

            <div className={Styles.lupa}>
                <Lupa width={20} url={null} title={null} isCorPrincipal={(isModoDark ?? false)} />
            </div>
        </div>
    )
}

