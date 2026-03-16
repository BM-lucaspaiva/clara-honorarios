import { arredondar } from "./helpers";

/**
 * Calcula o acréscimo por filiais.
 * Cada filial adiciona um percentual configurável sobre a base.
 */
export function calcularFiliais(valorBase, filiais, porcFiliais) {

  const quantidadeFiliais = Number(filiais || 0)
  const percentual = Number(porcFiliais || 0)

  if (!quantidadeFiliais && quantidadeFiliais == 0) return 0

  return arredondar(quantidadeFiliais * (percentual/100) * valorBase)
}
