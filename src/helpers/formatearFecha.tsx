export const formatearFecha = (fecha:string) => {
    const fechaN = fecha.split('T')[0].split('-');
    const f = `${fechaN[1]}-${fechaN[2]}-${fechaN[0]}`;
    // const nuevaFecha = new Date(fecha)
    // const nuevaFecha = new Date(`${fechaN[2]}-${fechaN[1]}-${fechaN[0]}`)
    const nuevaFecha = new Date(f)

    const options:Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return nuevaFecha.toLocaleDateString('es-ES', options);
}