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
 * Quando houver múltiplos segmentos, soma o valor de todos.
 */
export function calcularSegmento(valorBase, segmento) {
  const segmentos = Array.isArray(segmento) ? segmento : segmento ? [segmento] : []
  if (segmentos.length === 0) return 0

  const totalBase = segmentos.reduce((acumulado, item) => {
    return acumulado + arredondar(valorBase * (segmentoMap[item] || 0))
  }, 0)

  // Aplica redutor por combinação de segmentos selecionados.
  let fatorCombinacao = 1
  if (segmentos.length === 2) fatorCombinacao = 0.85
  if (segmentos.length === 3) fatorCombinacao = 0.75

  const total = totalBase * fatorCombinacao

  return arredondar(total)
}
