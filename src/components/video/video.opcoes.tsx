import ImgComentario from '@/assets/images/icones/comentario.webp';
import ImgCompartilhar from '@/assets/images/icones/compartilhar.webp';
import ImgCoracao from '@/assets/images/icones/coracao.webp';
import Styles from '@/components/video/styles/video.opcoes.module.scss';
import useWindowSize from '@/hooks/outros/useWindowSize';
import Image, { StaticImageData } from 'next/image';

interface iParametros {
    id: string;
    videoWidth: number;
}

export default function VideoOpcoes({ id, videoWidth }: iParametros) {

    const tamanhoTela = useWindowSize();

    return (
        <div
            className={Styles.opcoes}
            style={{ marginLeft: tamanhoTela?.width! > 801 ? `${(videoWidth + 125)}px` : '' }}
        >
            <span>#{id}</span>

            <Icone imagem={ImgCoracao} title='Curtir vídeo' isVermelho={true} />
            <Icone imagem={ImgComentario} title='Comentários' isVermelho={false} />
            <Icone imagem={ImgCompartilhar} title='Compartilhar' isVermelho={false} />
        </div>
    )
}

interface iIcone {
    imagem: StaticImageData;
    title: string;
    isVermelho: boolean;
}

export function Icone({ imagem, title, isVermelho }: iIcone) {
    return (
        <div
            className={`${Styles.icone} ${(isVermelho && Styles.iconeVermelhoHover)}`}
            title={title}
        >
            <Image src={imagem} alt='' />
        </div>
    )
}