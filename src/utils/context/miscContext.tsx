import { createContext, useState } from 'react';
import iContextMisc from '../types/iContextMisc';

interface iContext {
    queryBuscaContext: [queryBusca: string | null | undefined, setQueryBusca: any];
    isModoDarkContext: [isModoDark: boolean | null | undefined, setIsModoDark: any];
}

const _item = '_misc';
export const MiscContext = createContext<iContext | null>(null);

export const MiscProvider = (props: any) => {
    const [queryBusca, setQueryBusca] = useState<string | null | undefined>(MiscLocalStorage?.get()?.queryBusca ?? null);
    const [isModoDark, setIsModoDark] = useState<boolean | null | undefined>(MiscLocalStorage?.get()?.isModoDark ?? null);

    return (
        <MiscContext.Provider value={{
            queryBuscaContext: [queryBusca, setQueryBusca],
            isModoDarkContext: [isModoDark, setIsModoDark]
        }}>
            {props.children}
        </MiscContext.Provider>
    );
}

export const MiscLocalStorage = {
    set(data: iContextMisc): void {
        const dadosAnteriores = MiscLocalStorage.get() as iContextMisc;

        const dados = {
            queryBusca: data?.queryBusca ?? dadosAnteriores?.queryBusca,
            isModoDark: data?.isModoDark ?? dadosAnteriores?.isModoDark
        } as iContextMisc;

        const parsedData = JSON.stringify(dados);
        localStorage.setItem(_item, parsedData);
    },

    get(): iContextMisc | null {
        if (typeof window !== 'undefined') {
            let data = localStorage.getItem(_item);

            if (!data) {
                return null;
            }

            let dataJson = JSON.parse(data);
            return dataJson;
        } else {
            return null;
        }
    },

    delete(): void {
        localStorage.removeItem(_item);
    },
}