import EmojiMedicacao from '@/assets/images/outros/emoji-meditacao.webp';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import { MiscContext, MiscLocalStorage } from '@/utils/context/miscContext';
import iContextMisc from '@/utils/types/iContextMisc';
import iFiltroItem from '@/utils/types/iFiltroItem';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment, useContext, useEffect } from 'react';
import FiltrosInput from './components/filtros.input';
import FiltrosListaItens from './components/filtros.listaItens';
import Styles from './styles/filtros.module.scss';

export default function Index() {

    const miscContext = useContext(MiscContext); // Contexto misc;
    const [queryBusca, setQueryBusca] = [miscContext?.queryBuscaContext[0], miscContext?.queryBuscaContext[1]];

    useEffect(() => {
        const query = { queryBusca: 'Dog' } as iContextMisc;
        setQueryBusca(query);
        MiscLocalStorage.set(query);
    }, []);

    const listaTopicos = [
        { filtroItemId: 1, item: 'Teste', descricao: 'Testando', isAtivo: true },
        { filtroItemId: 2, item: 'Teste 2', descricao: 'Testando 2', isAtivo: true },
        { filtroItemId: 3, item: 'Teste 3', descricao: 'Testando 3', isAtivo: true },
        { filtroItemId: 4, item: 'Teste 4', descricao: 'Testando 4', isAtivo: true },
        { filtroItemId: 5, item: 'Teste 5', descricao: 'Testando 5', isAtivo: true },
        { filtroItemId: 6, item: 'Teste 6', descricao: 'Testando 6', isAtivo: true }
    ] as iFiltroItem[];

    return (
        <Fragment>
            <Head>
                <title>Filtros • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            <main className={Styles.main}>
                <div className={Styles.divTitulo}>
                    <span>{CONSTS_SISTEMA.NOME_SISTEMA}</span>

                    <div className='animate__animated animate__pulse animate__slower animate__infinite'>
                        <Image src={EmojiMedicacao} alt='' width={50} height={63} />
                    </div>
                </div>

                <FiltrosInput topicoBuscado='' />

                <FiltrosListaItens listaTopicos={listaTopicos} />
            </main>
        </Fragment>
    )
}