import CONSTS_TELAS from '@/utils/consts/outros/telas';
import { MiscContext, MiscLocalStorage } from '@/utils/context/miscContext';
import removerHTML from '@/utils/misc/removerHTML';
import iContextMisc from '@/utils/types/iContextMisc';
import iFiltroItem from '@/utils/types/iFiltroItem';
import Router from 'next/router';
import { useContext } from 'react';
import Styles from './../styles/filtros.listaItens.module.scss';

interface iParametros {
    listaTopicos: iFiltroItem[];
}

export default function FiltrosListaItens({ listaTopicos }: iParametros) {
    FiltrosListaItens
    const miscContext = useContext(MiscContext); // Contexto misc;
    const [queryBusca, setQueryBusca] = [miscContext?.queryBuscaContext[0], miscContext?.queryBuscaContext[1]];

    function handleClick(item: iFiltroItem) {
        const query = { queryBusca: item.ingles } as iContextMisc;
        setQueryBusca(item.ingles);
        MiscLocalStorage.set(query);

        setTimeout(() => {
            Router.push(CONSTS_TELAS.INDEX);
        }, 500);
    }

    return (
        <div className={Styles.main}>
            {
                listaTopicos && listaTopicos?.length > 0 ? (
                    listaTopicos?.map((item: iFiltroItem, i: number) => (
                        <div
                            key={i}
                            className={Styles.topico}
                            onClick={() => handleClick(item)}
                        >
                            <div className={Styles.titulo} title={removerHTML(item?.portugues)} dangerouslySetInnerHTML={{ __html: item?.portugues }} />
                            <span className={Styles.subtitulo}>{item?.qtdVideos} {(item?.qtdVideos === 1 ? 'vídeo' : 'vídeos')}</span>
                        </div>
                    ))
                ) : (
                    <div>
                        <span>Eita... pra onde foram os itens?</span>
                    </div>
                )
            }
        </div>
    )
}

