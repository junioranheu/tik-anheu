import ImgPlay from '@/assets/images/icones/play.webp';
import ImgSom from '@/assets/images/icones/som.webp';
import Styles from '@/components/video/styles/video.opcoes.centro.module.scss';
import { Aviso } from '@/utils/misc/aviso';
import gerarEmojiAleatorio from '@/utils/misc/gerarEmojiAleatorio';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

interface iParametros {
    id: string;
    videoWidth: number;
    classCSS: string;
}

export default function VideoOpcoesCentro({ id, videoWidth, classCSS }: iParametros) {

    const [isCurtido, setIsCurtido] = useState<boolean>(false);

    function handleCurtir() {
        setIsCurtido(!isCurtido);
    }

    function handleComentarios() {
        Aviso.toast(`Visualizar comentários do vídeo #${id}`, 3500, gerarEmojiAleatorio(), true);
    }

    return (
        <div
            className={`${Styles.opcoes} ${classCSS}`}
            style={{ width: `${videoWidth}px` }}
        >
            <Icone imagem={ImgPlay} title='Tocar vídeo' handleFn={() => handleComentarios()} />
            <Icone imagem={ImgSom} title='Mutar vídeo' handleFn={() => handleCurtir()} />
        </div>
    )
}

interface iIcone {
    imagem: StaticImageData;
    title: string;
    handleFn: () => void;
}

export function Icone({ imagem, title, handleFn }: iIcone) {
    return (
        <div
            className={Styles.icone}
            title={title}
            onClick={() => handleFn()}
        >
            <Image src={imagem} alt='' />
        </div >
    )
}