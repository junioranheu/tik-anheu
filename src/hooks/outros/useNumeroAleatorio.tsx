
import gerarNumeroAleatorio from '@/utils/misc/gerarNumeroAleatorio';
import { useEffect, useState } from 'react';

export default function useNumeroAleatorio(min: number, max: number) {

    const [numeroAleatorio, setNumeroAleatorio] = useState<number>(0);
    useEffect(() => {
        setNumeroAleatorio(gerarNumeroAleatorio(min, max));
    }, [min, max]);

    return numeroAleatorio;
}