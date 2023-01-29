import Styles from '@/components/video/styles/video.main.module.scss';
import useWindowSize from '@/hooks/outros/useWindowSize';
import { Aviso } from '@/utils/misc/aviso';
import { useEffect, useRef, useState } from 'react';
import VideoDetalhes from './video.detalhes';
import ProgressBar from './video.progressBar';

interface iParametros {
    index: number;
    autorNome: string;
    autorLink: string;
    videoUrl: string;
    isMutado: boolean;
}

export default function VideoMain({ index, autorNome, autorLink, videoUrl, isMutado }: iParametros) {

    const refVideo = useRef<HTMLVideoElement>(null);

    function togglePlay() {
        const currentVideo = refVideo?.current;
        Aviso.toast(`Vídeo #${index}`, 1000, '', true);

        if (currentVideo?.paused) {
            currentVideo?.play();
        } else {
            currentVideo?.pause();
        }
    }

    const [progress, setProgress] = useState<number>(0);
    function handleProgress(n: number) {
        setProgress(Math.trunc(n));
    }

    const tamanhoTela = useWindowSize();
    const [videoWidth, setvideoWidth] = useState<number>(0);
    useEffect(() => {
        setvideoWidth(refVideo?.current?.getBoundingClientRect()?.width ?? 0);
    }, [refVideo?.current, tamanhoTela]);

    const [infoProgress, setInfoProgress] = useState<string>('');
    useEffect(() => {
        if (refVideo?.current?.duration && videoWidth) {
            const segundoAtual = 5;
            const segundoMaximo = refVideo?.current?.duration;
            const porcentagemVista = (segundoAtual / segundoMaximo) * 100;
            let porcentagemVistaWidth = Math.trunc(porcentagemVista / videoWidth);
            porcentagemVistaWidth = porcentagemVistaWidth < 0 ? 0 : porcentagemVistaWidth;
            porcentagemVistaWidth = porcentagemVistaWidth > 100 ? 100 : porcentagemVistaWidth;

            setInfoProgress(`${segundoAtual} ${segundoMaximo} ${porcentagemVista}`);
            // setInfoProgress(`O progresso do vídeo #${index} é ${porcentagemVistaWidth}px de ${videoWidth}px, equivalente a ${porcentagemVistaWidth}%`);
            setProgress(porcentagemVistaWidth);
        }
    }, [refVideo, videoWidth]);

    return (
        <section className={Styles.sessaoVideo}>
            <video
                ref={refVideo}
                id={index.toString()}
                className={Styles.video}
                muted={isMutado}
                autoPlay={true}
                loop={true}
                playsInline={true}
                disablePictureInPicture={true}
                controls={false}
                onClick={() => togglePlay()}

            >
                <source src={videoUrl} type='video/mp4' />
            </video>

            <ProgressBar
                handleProgress={handleProgress}
                progress={progress}
                width={`${videoWidth}px`}
            />

            <VideoDetalhes
                id={index.toString()}
                autorNome={autorNome}
                autorLink={autorLink}
                togglePlay={() => togglePlay()}
                infoProgress={infoProgress}
            />
        </section>
    )
}