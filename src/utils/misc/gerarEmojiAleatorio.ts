import gerarItemRandom from './gerarItemRandom';

export default function gerarEmojiAleatorio() {
    const emojis = [
        '🤠', '😁', '😺', '👋', '👊',
        '✨', '👍', '🙃', '🤯', '👻',
        '🖖', '🎉'
    ];

    return gerarItemRandom(emojis);
}