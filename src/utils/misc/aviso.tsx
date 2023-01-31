import toast from 'react-hot-toast'; // https://github.com/timolins/react-hot-toast & https://react-hot-toast.com/
import { MiscLocalStorage } from '../context/miscContext';

export const Aviso = {
    toast(texto: string, ms: number, icone: string | null, isDark: boolean) {
        const styleGlass = {
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '1rem',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            color: 'var(--branco)',
            userSelect: 'none'
        } as any;

        const styleDark = {
            background: MiscLocalStorage.get()?.isModoDark ? 'rgba(255, 255, 255, 0.5)' : 'rgb(59, 59, 59)',
            borderRadius: '1rem',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.25)',
            color: 'var(--branco)',
            userSelect: 'none'
        } as any;

        const style = isDark ? styleDark : styleGlass;

        toast(
            (t) => (
                <span onClick={() => toast.dismiss(t.id)}>
                    <span dangerouslySetInnerHTML={{ __html: texto }} />
                </span>
            ),
            {
                duration: ms,
                position: 'top-center',
                icon: icone,
                style: style
            });
    }
}
