export function FP(i: number, n: number) {
  return (1 + i) ** n
}

export function PF(i: number, n: number) {
  return (1 + i) ** (-n)
}

export function FA(i: number, n: number) {
  return ((1 + i) ** n - 1) / i;
}

export function AF(i: number, n: number) {
  return (i) / ((1 + i) ** n - 1);
}

export function AP(i: number, n: number) {
  return (i * (1 + i) ** n) / ((1 + i) ** n - 1)
}

export function PA(i: number, n: number) {
  return ((1 + i) ** n - 1) / (i * (1 + i) ** n);
}

export function AG(i: number, n: number) {
  return ((1 + i) ** n - i*n - 1) / (i * (1 + i) ** n - i)
}

export function PG(i: number, n: number) {
  return ((1 + i) ** n - i * n - 1) / (i ** 2 * (1 + i) ** n)
}

export function FG(i: number, n: number) {
  return PG(i, n) * FP(i, n);
}
