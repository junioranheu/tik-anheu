import ImgEtc from '@/assets/images/icones/etc.webp';
import ImgHome from '@/assets/images/icones/home.webp';
import ImgLua from '@/assets/images/icones/lua.webp';
import ImgLupa from '@/assets/images/icones/lupa.webp';
import ImgPerfil from '@/assets/images/icones/perfil.webp';
import ImgSol from '@/assets/images/icones/sol.webp';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import CONSTS_TELAS from '@/utils/consts/outros/telas';
import { MiscContext } from '@/utils/context/miscContext';
import Image, { StaticImageData } from 'next/image';
import Router, { useRouter } from 'next/router';
import { useContext } from 'react';
import Styles from './styles/outras-opcoes.module.scss';

export default function OutrasOpcoes() {

    const isDebugging = false;
    const { asPath } = useRouter();

    const miscContext = useContext(MiscContext); // Contexto misc;
    const [queryBusca, setQueryBusca] = [miscContext?.queryBuscaContext[0], miscContext?.queryBuscaContext[1]];
    const [isModoDark, setIsModoDark] = [miscContext?.isModoDarkContext[0], miscContext?.isModoDarkContext[1]];

    return (
        <section className={`${Styles.opcoes} ${(asPath !== CONSTS_TELAS.INDEX && Styles.opcoesAbsoluteTop)}`}>
            <div className={Styles.divIcones}>
                <Icone imagem={(isModoDark ? ImgLua : ImgSol)} title={(isModoDark ? 'Alterar para modo dark' : 'Alterar para modo light')} handleFn={() => setIsModoDark(!isModoDark)} isProbido={false} />
                <Icone imagem={ImgEtc} title='Outras opções' handleFn={() => null} isProbido={true} />

                {
                    asPath !== CONSTS_TELAS.INDEX ? (
                        <Icone imagem={ImgHome} title='Voltar ao início' handleFn={() => Router.push(CONSTS_TELAS.INDEX)} isProbido={false} />
                    ) : (
                        <Icone imagem={ImgLupa} title={(queryBusca ? `Filtro atual: "${queryBusca}" — clique para buscar novo filtro` : 'Clique para buscar novo filtro')} handleFn={() => Router.push(CONSTS_TELAS.FILTROS)} isProbido={false} />
                    )
                }

                <Icone imagem={ImgPerfil} title='Perfil' handleFn={() => null} isProbido={true} />
            </div>

            <div className={Styles.infos}>
                {
                    isDebugging && queryBusca && (
                        <span className='debug'>queryBusca: {queryBusca}</span>
                    )
                }

                {
                    isDebugging && <span className='debug'>isModoDark: {isModoDark!.toString()}</span>
                }

                <span>Via Pexel API</span>

                {
                    queryBusca && (
                        <span>Buscando vídeos sobre <span className={Styles.spanBold}>{queryBusca.toLocaleLowerCase()}</span></span>
                    )
                }
            </div>
        </section>
    )
}

interface iIcone {
    imagem: StaticImageData;
    title: string;
    handleFn: () => void;
    isProbido: boolean;
}

export function Icone({ imagem, title, handleFn, isProbido }: iIcone) {
    return (
        <div
            className={`${Styles.icone} ${(isProbido && 'cursorProibido')}`}
            title={title}
            onClick={() => handleFn()}
        >
            <Image src={imagem} alt='' id={CONSTS_SISTEMA.ID_IMG_MODO_DARK} />
        </div >
    )
}