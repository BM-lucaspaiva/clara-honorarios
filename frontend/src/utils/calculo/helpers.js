/**
 * Arredonda sempre para cima para evitar subprecificação no resultado.
 */
export function arredondar(valor) {
  return Math.ceil(Number(valor || 0))
}

/**
 * Formata números para moeda brasileira (BRL).
 */
export function formatCurrency(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

/**
 * Converte entrada textual localizada em número.
 * Aceita vírgula ou ponto decimal e ignora separadores de milhar.
 */
export function parseLocalizedNumber(valor) {
  if (valor === "" || valor === null || valor === undefined) return 0

  let normalized = String(valor).trim().replace(/[^\d,.-]/g, "")

  if (normalized.includes(",")) {
    normalized = normalized.replace(/\./g, "").replace(",", ".")
  } else {
    const dotCount = (normalized.match(/\./g) || []).length

    if (dotCount > 1) {
      normalized = normalized.replace(/\./g, "")
    } else if (dotCount === 1) {
      const [beforeDot, afterDot] = normalized.split(".")
      const isThousandsPattern = /^\d+$/.test(beforeDot) && /^\d{3}$/.test(afterDot)
      const isTypingThousandsContinuation =
        /^\d+$/.test(beforeDot) && /^\d{4,}$/.test(afterDot) && beforeDot.length <= 3

      if (isThousandsPattern || isTypingThousandsContinuation) {
        normalized = `${beforeDot}${afterDot}`
      }
    }
  }

  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

/**
 * Converte texto em inteiro, removendo caracteres não numéricos.
 */
export function parseIntegerInput(valor) {
  const cleaned = String(valor || "").replace(/[^\d]/g, "")
  if (!cleaned) return null

  const parsed = Number.parseInt(cleaned, 10)
  return Number.isFinite(parsed) ? parsed : null
}

/**
 * Formata número com padrão pt-BR para exibição em inputs.
 */
export function formatLocalizedNumber(valor, maxFractionDigits = 2) {
  if (valor === "" || valor === null || valor === undefined) return ""

  const number = Number(valor)
  if (!Number.isFinite(number)) return ""
  if (number === 0) return "0"

  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
  })
}

/**
 * Limita um valor numérico a um intervalo mínimo e máximo.
 */
export function clamp(valor, min, max) {
  return Math.min(Math.max(valor, min), max)
}
