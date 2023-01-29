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
    const [videosLoaded, setVideosLoaded] = useState<boolean>(false);

    const qtdImagensPorVez = 3;
    const [videoIdAtual, setVideoIdAtual] = useState<number>(0);
    const [carregarNovosVideoEm, setCarregarNovosVideoEm] = useState<number>(qtdImagensPorVez);

    const [isMutado, setIsMutado] = useState<boolean>(false);

    const getVideos = useCallback(async () => {
        const client = createClient(keyPexelsAPI);

        // const queries = ['Funny', 'Art', 'Animals', 'Coding', 'Space'];
        const queries = ['Cats', 'Dogs', 'Monkeys'];
        const query = gerarItemRandom(queries);

        await client.videos
            .search({ query, per_page: qtdImagensPorVez, page: gerarNumeroAleatorio(1, 20), orientation: 'portrait' })
            .then((result) => {
                const resultado = result as unknown as iPexels;
                setVideos((oldVideos: iPexelsVideo[]) => [...oldVideos, ...resultado.videos]);
                setVideosLoaded(true);
                document.querySelectorAll('video').forEach(vid => vid.pause());

                if (process.env.NODE_ENV === 'development') {
                    // Aviso.toast(`${resultado.videos.length} novos vídeos baixados`, 3500, gerarEmojiAleatorio(), true);
                }
            })
            .catch((e: any) => {
                if (process.env.NODE_ENV === 'development') {
                    console.log('Houve um erro ao carregar os vídeos. Forçando recursão. Key alterada para CONSTS_SISTEMA.KEY_PEXELS_API_2', e);
                    // Aviso.toast('Houve um erro ao carregar os vídeos. Forçando recursão', 3500, gerarEmojiAleatorio(), true);
                }

                setVideosLoaded(false);
                setKeyPexelsAPI(CONSTS_SISTEMA.KEY_PEXELS_API_2);
                // getVideos(); // Recursão;
            });
    }, [keyPexelsAPI]);

    useEffect(() => {
        getVideos();
    }, [getVideos]);

    function handleWheel() {
        function isElementInViewport(el: HTMLVideoElement) {
            var rect = el.getBoundingClientRect();
            return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
        }

        setTimeout(function () {
            const videos = document?.getElementsByTagName('video');

            for (let i = 0; i < videos.length; i++) {
                const isInViewPort = isElementInViewport(videos[i]) as boolean;
                videos[i]?.pause();

                if (isInViewPort) {
                    videos[i]?.play();
                    setVideoIdAtual(i);
                }
            }
        }, 350);
    }

    useEffect(() => {
        async function verificarNecessidadeGetNovosVideos() {
            if ((carregarNovosVideoEm - 1) === videoIdAtual) {
                setCarregarNovosVideoEm((prev) => prev + 2);
                await getVideos();
            }
        }

        verificarNecessidadeGetNovosVideos();
    }, [videoIdAtual]);

    return (
        <Fragment>
            <Head>
                <title>Início • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            <main>
                <section
                    className={Styles.main}
                    onWheel={() => videosLoaded && handleWheel()}
                >
                    {
                        videos?.length > 0 ? (
                            <Fragment>
                                {
                                    videos?.map((v: iPexelsVideo, i: number) => (
                                        <VideoMain
                                            key={i}
                                            index={i}
                                            autorNome={v.user.name}
                                            autorLink={v.user.url}
                                            videoUrl={v.video_files[0].link}
                                            isMutado={isMutado}
                                        // indexUltimoVideo={videos.length - 1}
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
