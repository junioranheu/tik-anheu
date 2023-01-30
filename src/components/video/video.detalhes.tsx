import Styles from '@/components/video/styles/video.detalhes.module.scss';

interface iParametros {
    id: string;
    autorNome: string;
    autorLink: string;
    togglePlay: () => void;
}

export default function VideoDetalhes({ id, autorNome, autorLink, togglePlay }: iParametros) {
    return (
        <div className={Styles.detalhes} onClick={togglePlay}>
            <span>#{id}</span>
            <span>@{autorNome}</span>

            <span>
                Por <a href={autorLink}>{autorNome}</a> — Pexel
            </span>
        </div>
    )
}