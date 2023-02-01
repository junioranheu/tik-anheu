import { MiscContext } from '@/utils/context/miscContext';
import { Aviso } from '@/utils/misc/aviso';
import pegarNomeNavegador from '@/utils/misc/pegarNomeNavegador';
import toggleModoDark from '@/utils/misc/toggleModoDark';
import { useRouter } from 'next/router';
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
                Aviso.toast('Parece que seu navegador não é o Google Chrome! Isso talvez possa afetar negativamente em alguns pontos!', 6000, '😨', true);
            }
        }

        handleAvisoNavegador();
    }, []);

    return (
        <Fragment>
            <main className={'semHighlight'}>
                <Component {...pageProps} />

                <OutrasOpcoes />
            </main>
        </Fragment>
    )
}