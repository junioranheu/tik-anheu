import Styles from '@/components/video/styles/video.main.module.scss';
import useWindowSize from '@/hooks/outros/useWindowSize';
import { Dispatch, lazy, useEffect, useRef, useState } from 'react';
const ProgressBar = lazy(() => import('./video.progressBar'));
const VideoOpcoesEsquerda = lazy(() => import('./video.opcoes.esquerda'));
const VideoOpcoesDireita = lazy(() => import('./video.opcoes.direita'));
const VideoOpcoesCentro = lazy(() => import('./video.opcoes.centro'));

interface iParametros {
    index: number;
    autorNome: string;
    autorLink: string;
    videoUrl: string;
    isVideoInViewPort: boolean;
    isMutado: boolean;
    setIsMutado: Dispatch<boolean>;
}

export default function VideoMain({ index, autorNome, autorLink, videoUrl, isVideoInViewPort, isMutado, setIsMutado }: iParametros) {

    const refVideo = useRef<HTMLVideoElement>(null);

    function togglePlay() {
        const currentVideo = refVideo?.current;

        if (currentVideo?.paused) {
            currentVideo?.play();
        } else {
            currentVideo?.pause();
        }
    }

    const tamanhoTela = useWindowSize();
    const [videoWidth, setVideoWidth] = useState<number>(0);
    useEffect(() => {
        setVideoWidth(refVideo?.current?.getBoundingClientRect()?.width ?? 0);
    }, [tamanhoTela]);

    function ajustarPorcentagem(porcentagem: number) {
        porcentagem = porcentagem < 0 ? 0 : porcentagem;
        porcentagem = porcentagem > 100 ? 100 : porcentagem;

        return porcentagem;
    }

    const [progress, setProgress] = useState<number>(0);
    function handleProgress(n: number) {
        if (refVideo.current) {
            const tempo = (n / 100) * refVideo?.current?.duration;
            refVideo.current.currentTime = isNaN(tempo) ? 0 : tempo;
            setProgress(ajustarPorcentagem(n));
        }
    }

    useEffect(() => {
        const intervalo = setInterval(() => {
            if (isVideoInViewPort && refVideo?.current) {
                const tempoAtual = refVideo?.current?.currentTime;
                const duracao = refVideo?.current?.duration;
                const porcentagem = ajustarPorcentagem((tempoAtual / duracao) * 100);
                setProgress(porcentagem ?? 0);
            }
        }, 500);

        return () => clearInterval(intervalo);
    }, [isVideoInViewPort, videoWidth])

    return (
        <section className={Styles.sessaoVideo}>
            <video
                ref={refVideo}
                id={index.toString()}
                className={Styles.video}
                muted={isMutado}
                autoPlay={false}
                loop={true}
                playsInline={true}
                disablePictureInPicture={true}
                controls={false}
                preload='metadata'
            >
                <source src={`${videoUrl}#t=0.1`} type='video/mp4' />
            </video>

            <ProgressBar
                handleProgress={handleProgress}
                progress={progress}
                width={`${videoWidth}px`}
                isDebugging={false}
                classCSS={Styles.progress}
            />

            <VideoOpcoesEsquerda
                autorNome={autorNome}
                autorLink={autorLink}
            />

            <VideoOpcoesCentro
                id={index.toString()}
                isMutado={isMutado}
                setIsMutado={setIsMutado}
                togglePlay={() => togglePlay()}
                isVideoPausado={refVideo?.current?.paused!}
                videoWidth={videoWidth}
                classCSS={Styles.opcoesCentro}
            />

            <VideoOpcoesDireita
                id={index.toString()}
                videoWidth={videoWidth}
            />
        </section>
    )
}