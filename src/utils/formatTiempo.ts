export function formatTiempo(segundos: number): string {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
}
