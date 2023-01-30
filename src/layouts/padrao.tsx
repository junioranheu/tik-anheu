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

    return (
        <Fragment>
            <main className={efeitoAnimar}>
                <Component {...pageProps} />
            </main>
        </Fragment>
    )
}