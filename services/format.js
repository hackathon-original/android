export function currency(number) {
  return `R$ ${number.toFixed(2).replace('.', ',')}`;
}