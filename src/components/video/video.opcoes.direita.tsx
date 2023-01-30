import ImgComentario from '@/assets/images/icones/comentario.webp';
import ImgCompartilhar from '@/assets/images/icones/compartilhar.webp';
import ImgCoracao from '@/assets/images/icones/coracao.webp';
import Styles from '@/components/video/styles/video.opcoes.direita.module.scss';
import useWindowSize from '@/hooks/outros/useWindowSize';
import { Aviso } from '@/utils/misc/aviso';
import gerarEmojiAleatorio from '@/utils/misc/gerarEmojiAleatorio';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

interface iParametros {
    id: string;
    videoWidth: number;
}

export default function VideoOpcoesDireita({ id, videoWidth }: iParametros) {

    const tamanhoTela = useWindowSize();
    const [isCurtido, setIsCurtido] = useState<boolean>(false);

    function handleCurtir() {
        setIsCurtido(!isCurtido);
    }

    function handleComentarios() {
        Aviso.toast(`Visualizar comentários do vídeo #${id}`, 3500, gerarEmojiAleatorio(), true);
    }

    function handleCompartilhar() {
        Aviso.toast(`Compartilhar vídeo #${id}`, 3500, gerarEmojiAleatorio(), true);
    }

    return (
        <div
            className={Styles.opcoes}
            style={{ marginLeft: tamanhoTela?.width! > 801 ? `${(videoWidth + 80)}px` : '' }}
        >
            <Icone imagem={ImgCoracao} title='Curtir vídeo' handleFn={() => handleCurtir()} isCurtido={isCurtido} />
            <Icone imagem={ImgComentario} title='Comentários' handleFn={() => handleComentarios()} />
            <Icone imagem={ImgCompartilhar} title='Compartilhar' handleFn={() => handleCompartilhar()} />
        </div>
    )
}

interface iIcone {
    imagem: StaticImageData;
    title: string;
    handleFn: () => void;
    isCurtido?: boolean;
}

export function Icone({ imagem, title, handleFn, isCurtido }: iIcone) {
    return (
        <div
            className={`${Styles.icone} ${(isCurtido && Styles.iconeVermelho)}`}
            title={title}
            onClick={() => handleFn()}
        >
            <Image src={imagem} alt='' />
        </div >
    )
}