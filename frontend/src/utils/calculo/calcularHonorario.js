import { calcularBase } from "./baseCalculo"
import { calcularFaturamento } from "./faturamentoCalculo"
import { calcularFiliais } from "./filiaisCalculo"
import { calcularFuncionarios } from "./funcionariosCalculo"
import { calcularIntegracoes } from "./integracoesCalculo"
import { calcularRegime } from "./regimeCalculo"
import { calcularSegmento } from "./segmentoCalculo"
import { calcularBalancete, calcularReuniao } from "./variaveisCalculo"

/**
 * Consolida todas as regras de cálculo de honorários e retorna os detalhamentos.
 */
export function calcularHonorario(dados = {}, integracoes = {}) {
  const valorBase = calcularBase(dados)
  const regimeValor = calcularRegime(valorBase, dados.regime)
  const segmentoValor = calcularSegmento(valorBase, dados.segmento)
  const funcionariosValor = calcularFuncionarios(dados)
  const acresFaturamento = calcularFaturamento(dados.faturamento)
  const filiaisValor = calcularFiliais(valorBase, dados.filiais)
  const balanceteValor = calcularBalancete(dados.salarioMinimo, dados.balancete)
  const reuniaoValor = calcularReuniao(dados.salarioMinimo, dados.reuniao)

  const { total: integracoesValor, quantidade: integracoesQuantidade } = calcularIntegracoes(
    dados,
    regimeValor,
    segmentoValor,
    integracoes,
  )

  const piso = Number(dados.pisoPersonalizado || 0)

  let honorarioTotal =
    regimeValor +
    segmentoValor +
    funcionariosValor +
    acresFaturamento +
    balanceteValor +
    reuniaoValor +
    integracoesValor +
    filiaisValor

  if (piso > honorarioTotal) honorarioTotal = piso

  return {
    honorarioTotal: honorarioTotal || 0,
    valorBase: valorBase || 0,
    regimeValor: regimeValor || 0,
    segmentoValor: segmentoValor || 0,
    funcionariosValor: funcionariosValor || 0,
    acresFaturamento: acresFaturamento || 0,
    balanceteValor: balanceteValor || 0,
    reuniaoValor: reuniaoValor || 0,
    integracoesValor: integracoesValor || 0,
    variaveisSelecionadas: integracoesQuantidade || 0,
    piso: piso || 0,
    filiaisValor: filiaisValor || 0,
    regime: dados.regime || "",
    segmento: dados.segmento || "",
    balancete: dados.balancete || "",
    reuniao: dados.reuniao || "",
  }
}
