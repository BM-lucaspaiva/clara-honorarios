import { formatCurrency, parseLocalizedNumber } from "../../utils/calculo/helpers"

/**
 * Retorna "---" para valores vazios e mantem o valor original quando preenchido.
 */
const getDisplay = (value) => {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "---"
  if (value === null || value === undefined || value === "" || value === 0) return "---"
  return value
}

/**
 * Define cor mais clara para placeholders e cor padrao para valores preenchidos.
 */
const getClass = (value) => (value === "---" ? "text-slate-400" : "text-slate-900")
const temValor = (value) => value !== "---"

export default function ResumoHonorario({ dados, resultado }) {
  const descricaoVariaveis = resultado?.variaveisSelecionadas
    ? `${resultado.variaveisSelecionadas} selecionada(s)`
    : "---"

  const faturamentoTexto =
    Number(dados.faturamento || 0) > 0 ? formatCurrency(dados.faturamento) : "---"

  const regimeTexto = getDisplay(dados.regime)
  const segmentoTexto = getDisplay(dados.segmento)
  const sociosTexto = getDisplay(dados.socios)
  const funcionariosTexto = getDisplay(dados.funcionarios)
  const filiaisTexto = getDisplay(dados.filiais)
  const balanceteTexto = getDisplay(dados.balancete)
  const reuniaoTexto = getDisplay(dados.reuniao)
  const observacoesAdicionais = Array.isArray(dados.observacoes)
    ? dados.observacoes.filter((observacao) => {
        const nomePreenchido = String(observacao?.nome || "").trim() !== ""
        const valorPreenchido = parseLocalizedNumber(observacao?.valor) !== 0
        return nomePreenchido || valorPreenchido
      })
    : []
  const descricaoObservacoes = observacoesAdicionais.length
    ? `${observacoesAdicionais.length} adicional(is)`
    : "---"

  return (
    <div className="sticky top-24 overflow-hidden rounded-xl shadow-lg">
      <div className="bg-blue-600 p-6 text-center text-white">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-100">
          Honorário Mensal Estimado
        </p>
        <div className="text-4xl font-bold tracking-tight">{formatCurrency(resultado?.honorarioTotal)}</div>
      </div>

      <div className="border border-slate-200 bg-white p-6">
        <h3 className="mb-4 border-b border-slate-100 pb-2 font-semibold text-slate-900">
          Resumo da Simulação
        </h3>

        <ul className="space-y-3 text-sm">
          <li className="flex justify-between gap-4">
            <span className="text-slate-500">Regime:</span>
            <span className={`text-right font-medium ${getClass(regimeTexto)}`}>
              {regimeTexto}
              {temValor(regimeTexto) ? ` (${formatCurrency(resultado?.regimeValor)})` : ""}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-slate-500">Segmento:</span>
            <span className={`text-right font-medium ${getClass(segmentoTexto)}`}>
              {segmentoTexto}
              {temValor(segmentoTexto) ? ` (${formatCurrency(resultado?.segmentoValor)})` : ""}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-slate-500">Faturamento:</span>
            <span className={`text-right font-medium ${getClass(faturamentoTexto)}`}>
              {faturamentoTexto}
              {temValor(faturamentoTexto) ? ` (${formatCurrency(resultado?.acresFaturamento)})` : ""}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-slate-500">Sócios:</span>
            <span className={`text-right font-medium ${getClass(sociosTexto)}`}>
              {sociosTexto}
              {temValor(sociosTexto) ? ` (${formatCurrency(resultado?.sociosValor)})` : ""}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-slate-500">Funcionários:</span>
            <span className={`text-right font-medium ${getClass(funcionariosTexto)}`}>
              {funcionariosTexto}
              {(temValor(funcionariosTexto)) ? ` (${formatCurrency(resultado?.funcionariosValor)})` : ""}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-slate-500">Filiais:</span>
            <span className={`text-right font-medium ${getClass(filiaisTexto)}`}>
              {filiaisTexto}
              {temValor(filiaisTexto) ? ` (${formatCurrency(resultado?.filiaisValor)})` : ""}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-slate-500">Balancete:</span>
            <span className={`text-right font-medium ${getClass(balanceteTexto)}`}>
              {balanceteTexto}
              {temValor(balanceteTexto) ? ` (${formatCurrency(resultado?.balanceteValor)})` : ""}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-slate-500">Reuniao:</span>
            <span className={`text-right font-medium ${getClass(reuniaoTexto)}`}>
              {reuniaoTexto}
              {temValor(reuniaoTexto) ? ` (${formatCurrency(resultado?.reuniaoValor)})` : ""}
            </span>
          </li>
          <li className="flex justify-between gap-4 border-t border-slate-200 pt-2">
            <span className="text-slate-500">Variáveis:</span>
            <span className={`text-right font-medium ${getClass(descricaoVariaveis)}`}>
              {descricaoVariaveis}
              {temValor(descricaoVariaveis) ? ` (${formatCurrency(resultado?.integracoesValor)})` : ""}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-slate-500">Observações:</span>
            <span className={`text-right font-medium ${getClass(descricaoObservacoes)}`}>
              {descricaoObservacoes}
              {temValor(descricaoObservacoes) ? ` (${formatCurrency(resultado?.observacoesValor)})` : ""}
            </span>
          </li>
        </ul>

        <button className="mt-8 flex w-full items-center justify-center rounded-lg bg-blue-600 py-4 font-bold text-white transition-colors hover:bg-blue-700">
          Gerar Relatório de Honorários
        </button>
      </div>
    </div>
  )
}
