import Lupa from '@/components/svg/lupa';
import CONSTS_TELAS from '@/utils/consts/outros/telas';
import { MiscContext } from '@/utils/context/miscContext';
import { Aviso } from '@/utils/misc/aviso';
import Router from 'next/router';
import { KeyboardEvent, useContext, useState } from 'react';
import Styles from './../styles/filtros.module.scss';

interface iParametros {
    topicoBuscado: string | null;
}

export default function FiltrosInput({ topicoBuscado }: iParametros) {

    const modoDarkContext = useContext(MiscContext); // Contexto misc;
    const [isModoDark, setIsModoDark] = [modoDarkContext?.isModoDarkContext[0], modoDarkContext?.isModoDarkContext[1]];

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleBuscar();
        }
    }

    const [txtFiltro, setTxtFiltro] = useState<string>(topicoBuscado ?? '');
    function handleBuscar() {
        if (!txtFiltro) {
            Aviso.toast('Parece que você não escreveu nada no <b>campo de busca</b>', 5000, '🙅‍♂️', true);
            return false;
        }

        Router.push({ pathname: CONSTS_TELAS.FILTROS, query: { query: txtFiltro } });
    }

    return (
        <div className={Styles.divPesquisa}>
            <input
                className={Styles.inputPesquisaNavbar}
                type='text'
                placeholder='Procure por um tópico como "cat" ou "dog", por exemplo'
                onChange={(e) => setTxtFiltro(e.target.value)}
                onKeyPress={handleKeyPress}
                value={txtFiltro}
            />

            <div className={Styles.lupa} title='Buscar tópico' onClick={() => handleBuscar()}>
                <Lupa width={20} url={null} title={null} isCorPrincipal={(isModoDark ?? false)} />
            </div>
        </div>
    )
}

