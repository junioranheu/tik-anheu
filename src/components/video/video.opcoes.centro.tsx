import ImgPlay from '@/assets/images/icones/play.webp';
import ImgSomMudo from '@/assets/images/icones/som-mudo.webp';
import ImgSom from '@/assets/images/icones/som.webp';
import ImgStop from '@/assets/images/icones/stop.webp';
import Styles from '@/components/video/styles/video.opcoes.centro.module.scss';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import Image, { StaticImageData } from 'next/image';
import { Dispatch } from 'react';

interface iParametros {
    id: string;
    isMutado: boolean;
    setIsMutado: Dispatch<boolean>;
    togglePlay: () => void;
    isVideoPausado: boolean;
    videoWidth: number;
    classCSS: string;
}

export default function VideoOpcoesCentro({ id, isMutado, setIsMutado, togglePlay, isVideoPausado, videoWidth, classCSS }: iParametros) {
    return (
        <div
            className={`${Styles.opcoes} ${classCSS}`}
            style={{ width: `${videoWidth}px` }}
        >
            <Icone imagem={(isVideoPausado ? ImgPlay : ImgStop)} title='Tocar vídeo' handleFn={() => togglePlay()} />
            <Icone imagem={(isMutado ? ImgSomMudo : ImgSom)} title={(isMutado ? 'Habilitar som' : 'Desabilitar som')} handleFn={() => setIsMutado(!isMutado)} />
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
            <Image src={imagem} alt='' id={CONSTS_SISTEMA.ID_IMG_MODO_DARK} />
        </div >
    )
}