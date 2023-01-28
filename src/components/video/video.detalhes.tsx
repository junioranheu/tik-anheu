import Styles from '@/components/video/styles/video.detalhes.module.scss';

interface iParametros {
    autorNome: string;
    autorLink: string;
    togglePlay: () => void;
}

export default function VideoDetalhes({ autorNome, autorLink, togglePlay }: iParametros) {
    return (
        <div className={Styles.detalhes} onClick={togglePlay}>
            <p>@{autorNome}</p>

            <p>
                Video by <a href={autorLink}>{autorNome}</a> on Pexel
            </p>
        </div>
    )
}