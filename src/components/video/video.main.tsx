import Styles from '@/components/video/styles/video.main.module.scss';
import useIsInViewport from '@/hooks/useIsInViewPort';
import { useEffect, useRef, useState } from 'react';
import VideoDetalhes from './video.detalhes';

interface iParametros {
    index: number;
    autorNome: string;
    autorLink: string;
    videoUrl: string;
    indexUltimoVideo: number;
    getVideos: () => void;
}

export default function VideoMain({ index, autorNome, autorLink, videoUrl, indexUltimoVideo, getVideos }: iParametros) {

    const video = useRef<HTMLVideoElement>(null);
    const isInViewport = useIsInViewport(video);
    const [carregarNovosVideoEm, setCarregarNovosVideoEm] = useState(indexUltimoVideo);

    if (isInViewport) {
        setTimeout(() => {
            video?.current?.play();
        }, 1000);

        // console.log('loadNewVidsAt: ', loadNewVidsAt);
        // console.log('video?.current?.id: ', video?.current?.id);
        if (carregarNovosVideoEm === Number(video?.current?.id)) {
            setCarregarNovosVideoEm((prev) => prev + 2);
            getVideos();
        }
    }

    function togglePlay() {
        const currentVideo = video?.current;

        if (currentVideo?.paused) {
            currentVideo?.play();
        } else {
            currentVideo?.pause();
        }
    }

    useEffect(() => {
        if (!isInViewport) {
            video?.current?.pause();
        }
    }, [isInViewport]);

    return (
        <section className={Styles.sessaoVideo}>
            <video
                ref={video}
                id={index.toString()}
                className={Styles.video}
                onClick={() => togglePlay()}
                muted
                autoPlay
                loop
            >
                <source src={videoUrl} type='video/mp4' />
            </video>

            <VideoDetalhes
                autorNome={autorNome}
                autorLink={autorLink}
                togglePlay={() => togglePlay()}
            />
        </section>
    )
}