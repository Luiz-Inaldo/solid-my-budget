export const formatNumber = (value: number | undefined) => {
    if (value === undefined) return 'R$ 0,00';
    const number = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return number;
}