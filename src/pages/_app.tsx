import '@/styles/globals.scss';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {

    const { asPath } = useRouter();
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        // console.log('useEffect fired!', {asPath: router.asPath});

        // Setar url no Hook, para usar em verificarLayout();
        setUrl(asPath);

        // Scrollar pro top automaticamente;
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        // Limpar console;
        setTimeout(function () {
            process.env.NODE_ENV === 'production' && console.clear();
        }, 1000);

        // Não permitir F12 e clicar com o direito para inspecionar elemento;
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });

            document.onkeydown = function (e) {
                if (e.keyCode == 123) {
                    return false;
                }

                if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
                    return false;
                }

                if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
                    return false;
                }

                if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
                    return false;
                }

                if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
                    return false;
                }
            }
        }
    }, [asPath]);

    return url ?
        (
            <Fragment>
                <Head>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <meta name='description' content={`${CONSTS_SISTEMA.NOME_SISTEMA}`} />
                    <meta name='keywords' content='xxxxxxxxxxxxxx' />
                    <meta name='author' content='@junioranheu' />
                    <meta name='theme-color' content='#105EAA' />
                </Head>

                <Component {...pageProps} />
            </Fragment>
        ) : null
}
