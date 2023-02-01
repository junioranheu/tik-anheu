import EmojiMedicacao from '@/assets/images/outros/emoji-meditacao.webp';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import { MiscContext, MiscLocalStorage } from '@/utils/context/miscContext';
import iContextMisc from '@/utils/types/iContextMisc';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment, useContext, useEffect } from 'react';
import FiltrosInput from './components/filtros.input';
import Styles from './styles/filtros.module.scss';

export default function Index() {

    const miscContext = useContext(MiscContext); // Contexto misc;
    const [queryBusca, setQueryBusca] = [miscContext?.queryBuscaContext[0], miscContext?.queryBuscaContext[1]];

    useEffect(() => {
        const query = { queryBusca: 'Dog' } as iContextMisc;
        setQueryBusca(query);
        MiscLocalStorage.set(query);
    }, []);

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

                {/* <AjudaListaTopicos listaTopicos={null} />  */}
                {/* https://github.com/junioranheu/geek-spot/tree/main/front-end/pages/ajuda */}
            </main>
        </Fragment>
    )
}