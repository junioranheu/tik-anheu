import Styles from '@/components/video/styles/video.main.module.scss';
import { Aviso } from '@/utils/misc/aviso';
import { useRef } from 'react';
import VideoDetalhes from './video.detalhes';

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
            >
                <source src={videoUrl} type='video/mp4' />
            </video>

            <VideoDetalhes
                id={index.toString()}
                autorNome={autorNome}
                autorLink={autorLink}
                togglePlay={() => togglePlay()}
            />
        </section>
    )
}