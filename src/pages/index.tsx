import NavbarBottom from '@/components/navbar/navbar.bottom';
import VideoMain from '@/components/video/video.main';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import gerarItemRandom from '@/utils/misc/gerarItemRandom';
import gerarNumeroAleatorio from '@/utils/misc/gerarNumeroAleatorio';
import { iPexel, iPexelVideo } from '@/utils/types/iPexel';
import Head from 'next/head';
import { createClient } from 'pexels'; // https://www.pexels.com/api/documentation/
import { Fragment, useEffect, useState } from 'react';
import Styles from '../styles/home.module.scss';

export default function Home() {

    const [videos, setVideos] = useState<iPexelVideo[]>([]);
    const [videosLoaded, setVideosLoaded] = useState(false);

    function getVideos() {
        const client = createClient(CONSTS_SISTEMA.KEY_PEXELS_API);

        const queries = ['Funny', 'Art', 'Animals', 'Coding', 'Space'];
        const query = gerarItemRandom(queries);

        client.videos
            .search({ query, per_page: 10, page: gerarNumeroAleatorio(1, 20) })
            .then((result) => {
                const resultado = result as unknown as iPexel;
                console.log(resultado);

                setVideos((oldVideos: any) => [...oldVideos, ...resultado.videos]);
                setVideosLoaded(true);
            })
            .catch((e: any) => {
                console.log('Erro: ', e);
                setVideosLoaded(false);
                getVideos(); // Recursão;
            });
    }

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Início • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            <main>
                <section className={Styles.main}>
                    {
                        videos?.length > 0 ? (
                            <Fragment>
                                {
                                    videos?.map((v: iPexelVideo, id: number) => (
                                        <VideoMain
                                            key={id}
                                            index={id}
                                            autorNome={v.user.name}
                                            autorLink={v.user.url}
                                            videoUrl={v.video_files[0].link}
                                            indexUltimoVideo={videos.length - 1}
                                            getVideos={() => getVideos()}
                                        />
                                    ))
                                }
                            </Fragment>
                        ) : (
                            <Fragment>
                                <h1 style={{ color: 'coral' }}>Ops... parece que não há nenhum conteúdo para mostrar agora!</h1>
                            </Fragment>
                        )}
                </section>

                <NavbarBottom />
            </main>
        </Fragment>
    )
}
