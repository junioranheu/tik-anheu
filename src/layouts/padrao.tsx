import { Fragment } from 'react';

export default function LayoutPadrao({ Component, pageProps }: any) {
    return (
        <Fragment>
            <Component {...pageProps} />
        </Fragment>
    )
}