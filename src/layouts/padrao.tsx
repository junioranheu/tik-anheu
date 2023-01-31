import { Aviso } from '@/utils/misc/aviso';
import pegarNomeNavegador from '@/utils/misc/pegarNomeNavegador';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

export default function LayoutPadrao({ Component, pageProps }: any) {

    const { asPath } = useRouter();

    const [efeitoAnimar, setEfeitoAnimar] = useState<string>('');
    useEffect(() => {
        setEfeitoAnimar('animate__animated animate__fadeIn animate__delay03');

        setTimeout(function () {
            setEfeitoAnimar('');
        }, 1000);
    }, [asPath]);

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
            <main className={`${efeitoAnimar} semHighlight`}>
                <Component {...pageProps} />
            </main>
        </Fragment>
    )
}