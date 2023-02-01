import EmojiMedicacao from '@/assets/images/outros/emoji-meditacao.webp';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import iFiltroItem from '@/utils/types/iFiltroItem';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment } from 'react';
import FiltrosInput from './components/filtros.input';
import FiltrosListaItens from './components/filtros.listaItens';
import Styles from './styles/filtros.module.scss';

export default function Index() {

    const listaTopicos = [
        {  portugues: 'Cachorros', ingles: 'Dog', isAtivo: true },
        {  portugues: 'Gatos', ingles: 'Cat', isAtivo: true },
        {  portugues: 'Macacos', ingles: 'Monkey', isAtivo: true },
        {  portugues: 'Insetos', ingles: 'Insects', isAtivo: true },
        {  portugues: 'Passáros', ingles: 'Bird', isAtivo: true },
        {  portugues: 'Gente', ingles: 'People', isAtivo: true },
        {  portugues: 'Artes', ingles: 'Art', isAtivo: true },
        {  portugues: 'Videogames', ingles: 'Videogame', isAtivo: true }
    ] as iFiltroItem[];

    return (
        <Fragment>
            <Head>
                <title>Filtros • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            <main className={Styles.main}>
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