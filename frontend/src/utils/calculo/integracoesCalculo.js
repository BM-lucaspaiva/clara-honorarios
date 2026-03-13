/**
 * Soma os custos das integrações selecionadas e retorna também a quantidade.
 */
export function calcularIntegracoes(dados = {}, regimeValor, 
  segmentoValor, integracoes = {}) {

  const salarioMinimo = Number(dados.salarioMinimo || 0)

  const arredondar = (valor) => Math.ceil(valor)

  let total = 0
  let quantidade = 0

  if (integracoes.niboDocs) {
    total += arredondar(24.40 / 0.73)
    quantidade++
  }

  if (integracoes.niboGF) {
    total += arredondar(47 / 0.73)
    quantidade++
  }

  if (integracoes.hubcont) {
    total += arredondar(100 / 0.78)
    quantidade++
  }

  if (integracoes.bragaOnline) {
    total += arredondar(15 / 0.73)
    quantidade++
  }

  if (integracoes.centroCustos) {
    const valor = ((regimeValor + segmentoValor) * 0.10) / 0.88
    total += arredondar(valor)
    quantidade++
  }

  if (integracoes.crfBasico) {
    total += arredondar(salarioMinimo * 0.04)
    quantidade++
  }

  if (integracoes.crfCompleto) {
    total += arredondar(salarioMinimo * 0.12)
    quantidade++
  }

  return {
    total,
    quantidade
  }
}
