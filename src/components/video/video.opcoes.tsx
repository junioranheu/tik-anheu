import Styles from '@/components/video/styles/video.opcoes.module.scss';

interface iParametros {
    id: string;
}
 
export default function VideoOpcoes({ id }: iParametros) {
    return (
        <div className={Styles.opcoes}>
            <span>#{id}</span>
            <span>aea pues</span>
        </div>
    )
}