import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import { MiscContext, MiscLocalStorage } from '@/utils/context/miscContext';
import iContextMisc from '@/utils/types/iContextMisc';
import Head from 'next/head';
import { Fragment, useContext, useEffect } from 'react';
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
                <section>
                    <h1>Filtros</h1>
                </section>
            </main>
        </Fragment>
    )
}