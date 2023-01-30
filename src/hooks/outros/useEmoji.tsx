
import gerarEmojiAleatorio from '@/utils/misc/gerarEmojiAleatorio';
import { useEffect, useState } from 'react';

export default function useEmoji() {

    const [emoji, setEmoji] = useState<string>('');
    useEffect(() => {
       setEmoji(gerarEmojiAleatorio());
    }, []);

    return emoji;
}