import ImgComentario from '@/assets/images/icones/comentario.webp';
import ImgCompartilhar from '@/assets/images/icones/compartilhar.webp';
import ImgReportar from '@/assets/images/icones/reportar.webp';
import Styles from '@/components/video/styles/video.opcoes.direita.module.scss';
import useWindowSize from '@/hooks/outros/useWindowSize';
import { Aviso } from '@/utils/misc/aviso';
import gerarEmojiAleatorio from '@/utils/misc/gerarEmojiAleatorio';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import Coracao from '../outros/coracao';

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

    function handleReportar() {
        Aviso.toast(`Reportar vídeo #${id}`, 3500, gerarEmojiAleatorio(), true);
    }

    return (
        <div
            className={Styles.opcoes}
            style={{ marginLeft: tamanhoTela?.width! > 801 ? `${(videoWidth + 80)}px` : '' }}
        >
            <Icone imagem={null} componente={() => <Coracao isCurtido={isCurtido} />} title='Curtir vídeo' handleFn={() => handleCurtir()} />
            <Icone imagem={ImgComentario} componente={() => null} title='Comentários' handleFn={() => handleComentarios()} />
            <Icone imagem={ImgCompartilhar} componente={() => null} title='Compartilhar' handleFn={() => handleCompartilhar()} />
            <Icone imagem={ImgReportar} componente={() => null} title='Reportar' handleFn={() => handleReportar()} />
        </div>
    )
}

interface iIcone {
    imagem: StaticImageData | null;
    componente: () => JSX.Element | null;
    title: string;
    handleFn: () => void;
    isCurtido?: boolean;
}

export function Icone({ imagem, componente, title, handleFn }: iIcone) {
    return (
        <div
            className={Styles.icone}
            title={title}
            onClick={() => handleFn()}
        >
            {
                componente() && (
                    <div>{componente()}</div>
                )
            }

            {
                imagem && (
                    <Image src={imagem} alt='' />
                )
            }
        </div >
    )
}