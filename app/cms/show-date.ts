const monthsLookup: { [key: number]: string } = {
  0: "janeiro",
  1: "fevereiro",
  2: "março",
  3: "abril",
  4: "maio",
  5: "junho",
  6: "julho",
  7: "agosto",
  8: "setembro",
  9: "outubro",
  10: "novembro",
  11: "dezembro",
};

export function showDate(date: Date) {
  return `Em ${monthsLookup[date.getMonth()]} de ${date.getFullYear()}`;
}
