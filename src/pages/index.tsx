import Botao from '@/components/outros/botao';
import useEmoji from '@/hooks/outros/useEmoji';
import Styles from '@/styles/home.module.scss';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import { Aviso } from '@/utils/misc/aviso';
import gerarEmojiAleatorio from '@/utils/misc/gerarEmojiAleatorio';
import gerarItemRandom from '@/utils/misc/gerarItemRandom';
import gerarNumeroAleatorio from '@/utils/misc/gerarNumeroAleatorio';
import { iPexels, iPexelsVideo } from '@/utils/types/iPexels';
import Head from 'next/head';
import { createClient } from 'pexels'; // https://www.pexels.com/api/documentation/
import { Fragment, lazy, useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable'; // https://www.npmjs.com/package/react-swipeable
const VideoMain = lazy(() => import('@/components/video/video.main'));

export default function Home() {

    const isDebugging = false;
    const [keyPexelsAPI, setKeyPexelsAPI] = useState<string>(CONSTS_SISTEMA.KEY_PEXELS_API_1);
    const [videos, setVideos] = useState<iPexelsVideo[]>([]);
    const [videosLoaded, setVideosLoaded] = useState<boolean>(false);

    const qtdImagensPorVez = 5;
    const [videoIdAtual, setVideoIdAtual] = useState<number>(0);
    const [carregarNovosVideoEm, setCarregarNovosVideoEm] = useState<number>(qtdImagensPorVez);

    const emoji = useEmoji();
    const [isMutado, setIsMutado] = useState<boolean>(false);

    const iterarVideosEDefinirVideoIdAtual = useCallback(async (isUsarTimeOut: boolean) => {
        function isElementInViewport(el: HTMLVideoElement): boolean {
            var rect = el.getBoundingClientRect();
            return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
        }

        const videos = document?.getElementsByTagName('video');

        setTimeout(function () {
            for (let i = 0; i < videos.length; i++) {
                const video = videos[i];

                if (i > 0) {
                    video.currentTime = 0;
                }

                const isInViewPort = isElementInViewport(video) as boolean;
                if (isInViewPort) {
                    setVideoIdAtual(i);

                    setTimeout(function () {
                        video?.play();
                        isDebugging && Aviso.toast(`Play no vídeo #${i}`, 3500, gerarEmojiAleatorio(), true);
                    }, 250);
                } else {
                    video?.pause();
                }
            }
        }, isUsarTimeOut ? 400 : 1);
    }, [isDebugging]);

    const getVideos = useCallback(async () => {
        const client = createClient(keyPexelsAPI);

        // const queries = ['Funny', 'Art', 'Animals', 'Coding', 'Space'];
        const queries = ['Cats', 'Dogs', 'Monkeys'];
        const query = gerarItemRandom(queries);

        await client.videos
            .search({
                query,
                per_page: qtdImagensPorVez,
                page: gerarNumeroAleatorio(1, 20),
                orientation: 'portrait'
            })
            .then((result) => {
                const resultado = result as unknown as iPexels;
                setVideos((oldVideos: iPexelsVideo[]) => [...oldVideos, ...resultado.videos]);
                setVideosLoaded(true);

                // Verificar novamente;
                iterarVideosEDefinirVideoIdAtual(false);

                isDebugging && Aviso.toast(`${resultado.videos.length} novos vídeos baixados`, 3500, gerarEmojiAleatorio(), true);
            })
            .catch((e: any) => {
                if (process.env.NODE_ENV === 'development') {
                    console.log('Houve um erro ao carregar os vídeos. Forçando recursão. Key alterada para CONSTS_SISTEMA.KEY_PEXELS_API_2', e);
                    isDebugging && Aviso.toast('Houve um erro ao carregar os vídeos. Forçando recursão', 3500, gerarEmojiAleatorio(), true);
                }

                setVideosLoaded(false);
                setKeyPexelsAPI(CONSTS_SISTEMA.KEY_PEXELS_API_2);
                // getVideos(); // Recursão;
            });
    }, [keyPexelsAPI, iterarVideosEDefinirVideoIdAtual, isDebugging]);

    function handleWheel() {
        iterarVideosEDefinirVideoIdAtual(true);
    }

    useEffect(() => {
        async function verificarNecessidadeGetNovosVideos(novosEm: number, atual: number) {
            // Fluxo normal;
            if (novosEm === atual) {
                setCarregarNovosVideoEm((prev) => prev + qtdImagensPorVez);
                isDebugging && Aviso.toast('Fluxo normal', 3500, gerarEmojiAleatorio(), true);
                await getVideos();
            }

            // Fluxo inicial ou @BugFix - se a quantidade de vídeos for menor que o necessário, busque novamente mais vídeos;
            else if (videos?.length <= novosEm) {
                isDebugging && Aviso.toast('Fluxo inicial ou @BugFix', 3500, gerarEmojiAleatorio(), true);
                await getVideos();
            }
        }

        verificarNecessidadeGetNovosVideos((carregarNovosVideoEm - 2), videoIdAtual);
    }, [videoIdAtual, carregarNovosVideoEm, videos?.length, getVideos, isDebugging]);

    const handlerSwipe = useSwipeable({
        onSwiped: () => {
            // console.log('swiped');
            videosLoaded && handleWheel();
        }
    })

    return (
        <Fragment>
            <Head>
                <title>Início • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            <main>
                <section
                    className={Styles.main}
                    onWheel={() => videosLoaded && handleWheel()}
                    {...handlerSwipe}
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
                                            isVideoInViewPort={videoIdAtual === i}
                                            isMutado={isMutado}
                                        />
                                    ))
                                }
                            </Fragment>
                        ) : (
                            <div className={`${Styles.avisoErro} animate__animated animate__fadeIn animate__delay-1s`}>
                                <span>Parece que não há nenhum conteúdo para mostrar agora! {emoji}</span>

                                <Botao
                                    texto='Atualizar página'
                                    url={null}
                                    isNovaAba={false}
                                    handleFuncao={() => { window.location.href = window.location.href }}
                                    Svg={null}
                                    refBtn={null}
                                    isEnabled={true}
                                />
                            </div>
                        )}
                </section>
            </main>
        </Fragment>
    )
}
