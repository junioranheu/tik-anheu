import ImgEtc from '@/assets/images/icones/etc.webp';
import Styles from '@/components/video/styles/video.detalhes.module.scss';
import Image, { StaticImageData } from 'next/image';

interface iParametros {
    autorNome: string;
    autorLink: string;
}

export default function VideoDetalhes({ autorNome, autorLink }: iParametros) {
    return (
        <section className={Styles.detalhes}>
            <div className={Styles.opcoes}>
                <Icone imagem={ImgEtc} title='Outras opções' handleFn={() => null} />
                <Icone imagem={ImgEtc} title='Outras opções' handleFn={() => null} />
            </div>

            <div className={Styles.infos}>
                <span>@{autorNome}</span>

                <span>
                    Por <a href={autorLink}>{autorNome}</a> — Pexel
                </span>
            </div>
        </section>
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