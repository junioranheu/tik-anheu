import useIsInViewport from '@/hooks/useIsInViewPort';
import { useEffect, useRef, useState } from 'react';
import VideoDetalhes from './video.detalhes';

interface iParametros {
    index: number;
    autorNome: string;
    autorLink: string;
    videoUrl: string;
    indexUltimoVideo: number;
    getVideos: (qtdVideos: number) => void;
}

export default function VideoMain({ index, autorNome, autorLink, videoUrl, indexUltimoVideo, getVideos }: iParametros) {

    const video = useRef<HTMLVideoElement>(null);
    const isInViewport = useIsInViewport(video);
    const [loadNewVidsAt, setloadNewVidsAt] = useState(indexUltimoVideo);

    if (isInViewport) {
        setTimeout(() => {
            video?.current?.play();
        }, 1000);

        if (loadNewVidsAt === Number(video?.current?.id)) {
            setloadNewVidsAt((prev) => prev + 2);
            getVideos(3);
        }
    }

    function togglePlay() {
        let currentVideo = video.current;

        if (currentVideo?.paused) {
            currentVideo.play();
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
        <div className='slider-children'>
            <video
                muted
                className='video'
                ref={video}
                onClick={togglePlay}
                id={index.toString()}
                autoPlay={index === 1}
            >
                <source src={videoUrl} type='video/mp4' />
            </video>

            <VideoDetalhes
                autorNome={autorNome}
                autorLink={autorLink}
                togglePlay={() => togglePlay()}
            />
        </div>
    )
}