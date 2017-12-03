export function currency(number) {
  return `R$ ${(number || 0).toFixed(2).replace('.', ',')}`;
}