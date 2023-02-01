import removerHTML from '@/utils/misc/removerHTML';
import iFiltroItem from '@/utils/types/iFiltroItem';
import Styles from './../styles/filtros.listaItens.module.scss';

interface iParametros {
    listaTopicos: iFiltroItem[];
}

export default function FiltrosListaItens({ listaTopicos }: iParametros) {
    return (
        <div className={Styles.main}>
            {
                listaTopicos && listaTopicos?.length > 0 ? (
                    listaTopicos?.map((item: iFiltroItem, i: number) => (
                        <div
                            key={item?.filtroItemId}
                            className={Styles.topico}
                            title={removerHTML(item?.item)}
                            onClick={() => null}
                        >
                            <div className={Styles.titulo} title={removerHTML(item?.item)} dangerouslySetInnerHTML={{ __html: item?.item }} />
                            <span className={Styles.subtitulo}>{item?.descricao}</span>
                            <span className={Styles.saibaMais} title={`Saiba mais: ${removerHTML(item?.item?.toLowerCase())}`}>Saiba mais</span>
                        </div>
                    ))
                ) : (
                    <div>
                        <span>Eita... pra onde foram os itens?</span>
                    </div>
                )
            }
        </div>
    )
}

