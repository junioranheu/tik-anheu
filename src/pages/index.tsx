import BottomNav from '@/components/bottomNav';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import { iPexel } from '@/utils/types/iPexel';
import Head from 'next/head';
import { createClient } from 'pexels';
import { Fragment, useEffect, useState } from 'react';
// import Styles from '../styles/home.module.scss';

export default function Home() {

    const [videos, setVideos] = useState<iPexel[]>([]);
    const [videosLoaded, setVideosLoaded] = useState(false);

    function randomQuery() {
        const queries = ['Funny', 'Art', 'Animals', 'Coding', 'Space'];
        return queries[Math.floor(Math.random() * queries.length)];
    };

    function getVideos(length: number) {
        const client = createClient(CONSTS_SISTEMA.KEY_PEXELS_API);
        const query = randomQuery();
        console.log(query);

        client.videos
            .search({ query, per_page: length })
            .then((result) => {
                const resultado = result as unknown as iPexel;
                setVideos((oldVideos: any) => [...oldVideos, ...resultado.videos]);
                setVideosLoaded(true);
            })
            .catch((e) => setVideosLoaded(false));
    }

    useEffect(() => {
        getVideos(3);
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Início • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            <section>
                <div className='slider-container'>
                    {
                        videos?.length > 0 ? (
                            <>
                                {
                                    videos?.map((v: any, id: number) => (
                                        // <VideoCard
                                        //     key={id}
                                        //     index={id}
                                        //     author={v.user.name}
                                        //     videoURL={v.video_files[0].link}
                                        //     authorLink={v.user.url}
                                        //     lastVideoIndex={videos.length - 1}
                                        //     getVideos={getVideos}
                                        // />
                                        <h1 style={{ color: 'coral' }}>{v.user.name}</h1>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                <h1>Nothing to show here</h1>
                            </>
                        )}
                </div>

                <BottomNav />
            </section>
        </Fragment>
    )
}
