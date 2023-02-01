import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import Head from 'next/head';
import { Fragment } from 'react';
import Styles from '../styles/navegador.module.scss';

export default function Index() {
    return (
        <Fragment>
            <Head>
                <title>Erro • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            <main className={Styles.erro}>
                <span className={Styles.opa}>Ops...</span>
                <span>Para continuar no <span className={Styles.spanBold}>{CONSTS_SISTEMA.NOME_SISTEMA}</span> você deve utilizar o Google Chrome</span>
            </main>
        </Fragment>
    )
}