export default function gerarItemRandom(itens: any[]) {
    return itens[Math.floor(Math.random() * itens.length)];
}