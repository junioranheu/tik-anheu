import CONSTS_TELAS from '@/utils/consts/outros/telas';
import { MiscContext } from '@/utils/context/miscContext';
import pegarNomeNavegador from '@/utils/misc/pegarNomeNavegador';
import toggleModoDark from '@/utils/misc/toggleModoDark';
import Router, { useRouter } from 'next/router';
import { Fragment, lazy, useContext, useEffect } from 'react';
const OutrasOpcoes = lazy(() => import('@/components/outros/outras-opcoes'));

export default function LayoutPadrao({ Component, pageProps }: any) {

    const miscContext = useContext(MiscContext); // Contexto misc;
    const [isModoDark, setIsModoDark] = [miscContext?.isModoDarkContext[0], miscContext?.isModoDarkContext[1]];

    const { asPath } = useRouter();
    useEffect(() => {
        toggleModoDark(isModoDark, setIsModoDark);
    }, [isModoDark, setIsModoDark, asPath]);

    useEffect(() => {
        async function handleAvisoNavegador() {
            if (await pegarNomeNavegador() !== 'Chrome') {
                Router.push(CONSTS_TELAS.ERRO_NAVEGADOR);
            }
        }

        handleAvisoNavegador();
    }, [asPath]);

    return (
        <Fragment>
            <main className={'semHighlight'}>
                <Component {...pageProps} />

                <OutrasOpcoes />
            </main>
        </Fragment>
    )
}