import { arredondar } from "./helpers"

/**
 * Calcula a base considerando percentual do salário mínimo e carga de imposto.
 */
export function calcularBase(dados = {}) {
  const salarioMinimo = Number(dados.salarioMinimo || 0)
  const percentual = Number(dados.percentual)
  const imposto = Number(dados.imposto)

  const salarioPercentual = salarioMinimo * percentual
  const valorBase = arredondar(salarioPercentual / (1 - imposto) || 0)

  return valorBase
}
