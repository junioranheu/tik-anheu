import ImgEtc from '@/assets/images/icones/etc.webp';
import ImgLua from '@/assets/images/icones/lua.webp';
import ImgLupa from '@/assets/images/icones/lupa.webp';
import ImgPerfil from '@/assets/images/icones/perfil.webp';
import ImgSol from '@/assets/images/icones/sol.webp';
import Styles from '@/components/video/styles/video.detalhes.module.scss';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

interface iParametros {
    autorNome: string;
    autorLink: string;
}

export default function VideoDetalhes({ autorNome, autorLink }: iParametros) {

    const [isModoDark, setIsModoDark] = useState<boolean>(false);

    return (
        <section className={Styles.detalhes}>
            <div className={Styles.opcoes}>
                <Icone imagem={(isModoDark ? ImgLua : ImgSol)} title={(isModoDark ? 'Alterar para modo dark' : 'Alterar para modo light')} handleFn={() => setIsModoDark(!isModoDark)} />
                <Icone imagem={ImgEtc} title='Outras opções' handleFn={() => null} />
                <Icone imagem={ImgLupa} title='Buscar' handleFn={() => null} />
            <Icone imagem={ImgPerfil} title='Perfil' handleFn={() => null} />
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