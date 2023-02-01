import ImgComentario from '@/assets/images/icones/comentario.webp';
import ImgCompartilhar from '@/assets/images/icones/compartilhar.webp';
import ImgReportar from '@/assets/images/icones/reportar.webp';
import Styles from '@/components/video/styles/video.opcoes.direita.module.scss';
import useWindowSize from '@/hooks/outros/useWindowSize';
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

    return (
        <div
            className={Styles.opcoes}
            style={{ marginLeft: tamanhoTela?.width! > 801 ? `${(videoWidth + 80)}px` : '' }}
        >
            <Icone imagem={null} componente={() => <Coracao isCurtido={isCurtido} />} title='Curtir vídeo' handleFn={() => handleCurtir()} isProbido={false} />
            <Icone imagem={ImgComentario} componente={() => null} title='Comentários' handleFn={() => null} isProbido={true} />
            <Icone imagem={ImgCompartilhar} componente={() => null} title='Compartilhar' handleFn={() => null} isProbido={true} />
            <Icone imagem={ImgReportar} componente={() => null} title='Reportar' handleFn={() => null} isProbido={true} />
        </div>
    )
}

interface iIcone {
    imagem: StaticImageData | null;
    componente: () => JSX.Element | null;
    title: string;
    handleFn: () => void;
    isProbido?: boolean;
}

export function Icone({ imagem, componente, title, handleFn, isProbido }: iIcone) {
    return (
        <div
            className={`${Styles.icone} ${(isProbido && 'cursorProibido')}`}
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