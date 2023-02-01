import Router from 'next/router';
import Styles from './filtros.listaItens.module.scss';

interface iParametros {
    listaTopicos: iAjudaTopico[];
}

export default function FiltrosListaItens({ listaTopicos }: iParametros) {
    return (
        <div className={`${Styles.main} margem3`}>
            {
                listaTopicos && listaTopicos?.length > 0 ? (
                    listaTopicos?.map((item: iAjudaTopico, i: number) => (
                        <div
                            key={item?.ajudaTopicoId}
                            className={Styles.topico}
                            title={removerHTML(item?.topico)}
                            onClick={() => Router.push(`/ajuda/topico/${item?.ajudaTopicoId}/${ajustarUrl(removerHTML(item?.topico))}`)}
                        >
                            <div className={Styles.titulo} title={removerHTML(item?.topico)} dangerouslySetInnerHTML={{ __html: item?.topico }} />
                            <span className={Styles.subtitulo}>{item?.descricao}</span>
                            <span className={Styles.saibaMais} title={`Saiba mais: ${removerHTML(item?.topico?.toLowerCase())}`}>Saiba mais</span>
                        </div>
                    ))
                ) : (
                    <div>
                        <span className='texto'>Eita... pra onde foram os tópicos de ajuda?</span>
                    </div>
                )
            }
        </div>
    )
}

