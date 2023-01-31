import { Dispatch } from 'react';
import { MiscLocalStorage } from '../context/miscContext';

export default function toggleModoDark(isModoDark: boolean | null | undefined, setIsModoDark: Dispatch<boolean>) {
    // console.log(isModoDark);

    if (isModoDark) {
        // console.log('Ativar modo dark'); 
        document.documentElement.style.setProperty('--preto', '#FFFFFF'); // Preto fica branco;
        document.documentElement.style.setProperty('--super-preto', '#f4f2f0'); // Super preto fica bege;
        document.documentElement.style.setProperty('--branco', '#1A1A1A'); // Branco fica preto;
        selectorAll(true);
    } else if (!isModoDark) {
        // console.log('Ativar modo light');
        document.documentElement.style.setProperty('--preto', '#1A1A1A');
        document.documentElement.style.setProperty('--super-preto', '#000000');
        document.documentElement.style.setProperty('--branco', 'rgba(255, 255, 255, 0.9)');
        selectorAll(false);
    }

    // Atualizar no localStorage;
    setIsModoDark(isModoDark ?? false);
    MiscLocalStorage.set({ isModoDark: isModoDark ?? false });
}

function selectorAll(isModoDark: boolean) {
    const icones = document?.querySelectorAll('img[src*=".webp"]');

    for (let index = 0; index < icones?.length; index++) {
        const element = icones[index];

        if (isModoDark) {
            element.classList.add('imgModoDark');
        } else {
            element.classList.remove('imgModoDark');
        }
    }
}