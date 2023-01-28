interface iParametros {
    autorNome: string;
    autorLink: string;
    togglePlay: () => void;
}

export default function VideoDetalhes({ autorNome, autorLink, togglePlay }: iParametros) {
    return (
        <div className='video-content' onClick={togglePlay}>
            <p>@{autorNome}</p>
            
            <p>
                Video by <a href={autorLink}>{autorNome}</a> on Pexel
            </p>
        </div>
    )
}