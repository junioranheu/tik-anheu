import ImgEtc from '@/assets/images/icones/etc.webp';
import ImgLua from '@/assets/images/icones/lua.webp';
import ImgLupa from '@/assets/images/icones/lupa.webp';
import ImgPerfil from '@/assets/images/icones/perfil.webp';
import ImgSol from '@/assets/images/icones/sol.webp';
import Styles from '@/components/video/styles/video.opcoes.esquerda.module.scss';
import { MiscContext } from '@/utils/context/miscContext';
import toggleModoDark from '@/utils/misc/toggleModoDark';
import Image, { StaticImageData } from 'next/image';
import { useContext, useEffect } from 'react';

interface iParametros {
    autorNome: string;
    autorLink: string;
}

export default function VideoOpcoesEsquerda({ autorNome, autorLink }: iParametros) {

    const miscContext = useContext(MiscContext); // Contexto do modo dark;
    const [isModoDark, setIsModoDark] = [miscContext?.isModoDarkContext[0], miscContext?.isModoDarkContext[1]];
    
    useEffect(() => {
        toggleModoDark(isModoDark, setIsModoDark);
    }, [isModoDark, setIsModoDark]);
 
    return (
        <section className={Styles.opcoes}>
            <div className={Styles.divIcones}>
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