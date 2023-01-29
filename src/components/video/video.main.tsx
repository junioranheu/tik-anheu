import Styles from '@/components/video/styles/video.main.module.scss';
import { Aviso } from '@/utils/misc/aviso';
import { useRef, useState } from 'react';
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

    const [progress, setProgress] = useState<number>(100);
    function handleNota(n: number) {
        setProgress(Math.trunc(n));
    }

    return (
        <section className={Styles.sessaoVideo}>
            <video
                ref={refVideo}
                id={index.toString()}
                className={Styles.video}
                onClick={() => togglePlay()}
                muted={isMutado}
                autoPlay={true}
                loop={true}
                playsInline={true}
                disablePictureInPicture={true}
                controls={false}
            >
                <source src={videoUrl} type='video/mp4' />
            </video>

            <ProgressBar handleProgress={handleNota} progress={progress} />

            <VideoDetalhes
                id={index.toString()}
                autorNome={autorNome}
                autorLink={autorLink}
                togglePlay={() => togglePlay()}
            />
        </section>
    )
}