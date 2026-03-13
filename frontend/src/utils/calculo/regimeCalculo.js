import { arredondar } from "./helpers"

const regimeMap = {
  "Simples Nacional": 0.15,
  "Lucro Presumido": 0.2,
  "Isento/Imune": 0.18,
  "Lucro Real": 0.8,
  "PF/Livro Caixa": 0.1,
}

/**
 * Calcula o componente de honorário por regime tributário.
 */
export function calcularRegime(valorBase, regime) {
  if (!regime && regime == "Selecione o regime tributário") return 0
  return arredondar(valorBase * (regimeMap[regime] || 0))
}
