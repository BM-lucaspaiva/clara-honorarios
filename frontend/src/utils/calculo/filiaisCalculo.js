import { arredondar } from "./helpers";

/**
 * Calcula o acréscimo por filiais.
 * Cada filial adiciona um percentual configurável sobre a base.
 */
export function calcularFiliais(valorBase, filiais, porcFiliais) {

  const quantidadeFiliais = Number(filiais || 0)
  const percentual = Number(porcFiliais || 0)
  const percentualNormalizado = percentual > 1 ? percentual / 100 : percentual

  if (!Number.isFinite(quantidadeFiliais) || quantidadeFiliais <= 0) return 0

  return arredondar(quantidadeFiliais * percentualNormalizado * valorBase)
}
