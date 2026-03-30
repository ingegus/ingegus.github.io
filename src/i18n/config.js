export const locales = ['en', 'es'];

export function getLang(pathname) {
    return pathname.startsWith('/en') ? 'en' : 'es';
}