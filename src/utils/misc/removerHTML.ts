export default function removerHTML(str: string) {
    return str?.replace(/<[^>]*>?/gm, '');
}