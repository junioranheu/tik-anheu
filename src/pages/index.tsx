import NavbarBottom from '@/components/navbar/navbar.bottom';
import VideoMain from '@/components/video/video.main';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import gerarItemRandom from '@/utils/misc/gerarItemRandom';
import gerarNumeroAleatorio from '@/utils/misc/gerarNumeroAleatorio';
import { iPexels, iPexelsVideo } from '@/utils/types/iPexels';
import Head from 'next/head';
import { createClient } from 'pexels'; // https://www.pexels.com/api/documentation/
import { Fragment, useCallback, useEffect, useState } from 'react';
import Styles from '../styles/home.module.scss';

export default function Home() {

    const [keyPexelsAPI, setKeyPexelsAPI] = useState<string>(CONSTS_SISTEMA.KEY_PEXELS_API_1);
    const [videos, setVideos] = useState<iPexelsVideo[]>([]);
    const [videosLoaded, setVideosLoaded] = useState(false);

    const getVideos = useCallback(async () => {
        const client = createClient(keyPexelsAPI);

        // const queries = ['Funny', 'Art', 'Animals', 'Coding', 'Space'];
        const queries = ['Cats', 'Dogs', 'Monkeys'];
        const query = gerarItemRandom(queries);

        await client.videos
            .search({ query, per_page: 3, page: gerarNumeroAleatorio(1, 20) })
            .then((result) => {
                const resultado = result as unknown as iPexels;
                setVideos((oldVideos: iPexelsVideo[]) => [...oldVideos, ...resultado.videos]);
                setVideosLoaded(true);
            })
            .catch((e: any) => {
                process.env.NODE_ENV === 'development' && console.log('Houve um erro ao carregar os vídeos. Forçando recursão', e);
                setVideosLoaded(false);
                setKeyPexelsAPI(CONSTS_SISTEMA.KEY_PEXELS_API_2);
                getVideos(); // Recursão;
            });
    }, [keyPexelsAPI]);

    useEffect(() => {
        getVideos();
    }, [getVideos]);

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
                                    videos?.map((v: iPexelsVideo, id: number) => (
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
