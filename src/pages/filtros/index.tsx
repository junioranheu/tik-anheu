import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import Head from 'next/head';
import { Fragment } from 'react';
import Styles from './styles/filtros.module.scss';

export default function Index() {
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