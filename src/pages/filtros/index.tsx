import EmojiMedicacao from '@/assets/images/outros/emoji-meditacao.webp';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import gerarNumeroAleatorio from '@/utils/misc/gerarNumeroAleatorio';
import iFiltroItem from '@/utils/types/iFiltroItem';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment } from 'react';
import FiltrosInput from './components/filtros.input';
import FiltrosListaItens from './components/filtros.listaItens';
import Styles from './styles/filtros.module.scss';

export default function Index() {
 
    const listaTopicos = [
        { portugues: 'Cachorros', ingles: 'Dog', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Gatos', ingles: 'Cat', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Macacos', ingles: 'Monkey', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Insetos', ingles: 'Insect', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Borboletas', ingles: 'Butterfly Insect', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Bebês', ingles: 'Baby', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Passáros', ingles: 'Bird', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Gente', ingles: 'People', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Artes', ingles: 'Art', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Videogames', ingles: 'Videogame', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Programação', ingles: 'Coding', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Humor', ingles: 'Funny', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Comida', ingles: 'Food', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true },
        { portugues: 'Animais', ingles: 'Animal', qtdVideos: gerarNumeroAleatorio(500, 1500), isAtivo: true }
    ] as iFiltroItem[];

    return (
        <Fragment>
            <Head>
                <title>Filtros • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            <main className={`${Styles.main} animate__animated animate__fadeIn animate__delay03`}>
                <div className={Styles.divTitulo}>
                    <span>{CONSTS_SISTEMA.NOME_SISTEMA}</span>

                    <div className='animate__animated animate__pulse animate__slower animate__infinite'>
                        <Image src={EmojiMedicacao} alt='' width={50} height={63} />
                    </div>
                </div>

                <FiltrosInput topicoBuscado='' />

                <FiltrosListaItens listaTopicos={listaTopicos} />
            </main>
        </Fragment>
    )
}