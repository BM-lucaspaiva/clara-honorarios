import { arredondar } from "./helpers"

const segmentoMap = {
  "Prestação de Serviços": 0.15,
  "Comércio": 0.2,
  "Indústria": 0.35,
  "Construção Civil": 0.28,
  "Holding": 0.2
}

/**
 * Calcula o componente de honorário por segmento da empresa.
 */
export function calcularSegmento(valorBase, segmento) {
  if (!segmento) return 0
  return arredondar(valorBase * (segmentoMap[segmento] || 0))
}
