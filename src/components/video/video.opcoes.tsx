import Styles from '@/components/video/styles/video.opcoes.module.scss';

interface iParametros {
    id: string;
    videoWidth: number;
}

export default function VideoOpcoes({ id, videoWidth }: iParametros) {
    return (
        <div className={Styles.opcoes}>
            <span>#{id}</span>
            <span>aea pues</span>
            <span>{videoWidth}</span>
        </div>
    )
}