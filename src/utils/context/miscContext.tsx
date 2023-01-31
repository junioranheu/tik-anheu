import { createContext, useState } from 'react';
import iContextMisc from '../types/iContextMisc';

interface iContext {
   isModoDarkContext: [isModoDark: boolean | null | undefined, setIsModoDark: any];
}

const _item = '_misc';
export const MiscContext = createContext<iContext | null>(null);

export const MiscProvider = (props: any) => {
    const [isModoDark, setIsModoDark] = useState<boolean | null | undefined>(MiscLocalStorage?.get()?.isModoDark ?? null);

    return (
        <MiscContext.Provider value={{
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