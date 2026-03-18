import {
  formatCurrency,
  formatLocalizedNumber,
  parseLocalizedNumber,
} from "../../utils/calculo/helpers"

const SEGMENTOS = [
  "Prestação de Serviços",
  "Comércio",
  "Indústria",
  "Construção Civil",
  "Holding",
]

const REGIME_PERCENTUAL_MAP = {
  "Simples Nacional": 0.15,
  "Lucro Presumido": 0.2,
  "Isento/Imune": 0.18,
  "Lucro Real": 0.8,
  "PF/Livro Caixa": 0.1,
}

const SEGMENTO_PERCENTUAL_MAP = {
  "Prestação de Serviços": 0.15,
  "Comércio": 0.2,
  "Indústria": 0.35,
  "Construção Civil": 0.28,
  "Holding": 0.2,
}

const PERCENTUAL_MIN = 0.10
const PERCENTUAL_MAX = 0.50
const PORC_FILIAIS_MIN = 10
const PORC_FILIAIS_MAX = 50

function normalizarPercentualFiliais(valor) {
  const percentualBruto = Number(valor || 0)

  if (!Number.isFinite(percentualBruto) || percentualBruto <= 0) {
    return PORC_FILIAIS_MIN
  }

  const percentual = percentualBruto <= 1 ? percentualBruto * 100 : percentualBruto

  return Math.min(PORC_FILIAIS_MAX, Math.max(PORC_FILIAIS_MIN, Math.round(percentual)))
}

function formatPercent(valor, maximumFractionDigits = 2) {
  const numero = Number(valor || 0)
  return `${numero.toLocaleString("pt-BR", { maximumFractionDigits })}%`
}

function TooltipInfo({ text }) {
  return (
    <span className="group relative inline-flex">
      <span
        className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-slate-300 text-[10px] font-bold text-slate-500 transition-colors group-hover:border-blue-400 group-hover:text-blue-600"
        tabIndex={0}
      >
        ?
      </span>
      <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-30 w-72 -translate-x-1/2 whitespace-pre-line rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-normal leading-4 text-slate-600 opacity-0 shadow-lg transition-all duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
        {text}
      </span>
    </span>
  )
}

export default function DadosCliente({ dados, setDados, resultado }) {
  const segmentosSelecionados = Array.isArray(dados.segmento)
    ? dados.segmento
    : dados.segmento
      ? [dados.segmento]
      : []

  const percentualFaturamento = Number(dados.porcFaturamento || 0)
  const percentualFiliais = normalizarPercentualFiliais(dados.porcFiliais)
  const valorBase = Number(resultado?.valorBase || 0)
  const faturamento = Number(dados.faturamento || 0)
  const filiais = Number(dados.filiais || 0)
  const fatorSegmento =
    segmentosSelecionados.length === 2 ? 0.85 : segmentosSelecionados.length === 3 ? 0.75 : 1

  const regimePercentual = REGIME_PERCENTUAL_MAP[dados.regime] || 0
  const regimeTooltipText =
    valorBase > 0 && regimePercentual > 0
      ? `Cálculo: ${formatCurrency(valorBase)} x Porcentagem do Regime (${formatPercent(regimePercentual * 100, 0)})`
      : `Cálculo: ${formatCurrency(valorBase)} x Porcentagem do Regime`

  const somaPercentuaisSegmento = segmentosSelecionados.reduce((acumulado, item) => {
    return acumulado + (SEGMENTO_PERCENTUAL_MAP[item] || 0)
  }, 0)
  const segmentoBruto = valorBase * somaPercentuaisSegmento
  const segmentoTooltipText =
    valorBase > 0 && segmentosSelecionados.length > 0
      ? `Cálculo: ${formatCurrency(valorBase)} x Segmento (${formatPercent(somaPercentuaisSegmento * 100, 0)})`
      : `Cálculo: ${formatCurrency(valorBase)} x Segmento (${formatPercent(somaPercentuaisSegmento * 100, 0)})`

  const faturamentoCalculoText =
    faturamento > 0 && percentualFaturamento > 0
      ? `Faturamento ${formatCurrency(faturamento)} x Percentual de Faturamento (${formatPercent(percentualFaturamento)})`
      : `Faturamento: ${formatCurrency(faturamento)} x Percentual de Faturamento (${formatPercent(percentualFaturamento)})`

  const filiaisCalculoText =
    filiais > 0 && percentualFiliais > 0 && valorBase > 0
      ? `Filiais (${filiais}) x ${formatPercent(percentualFiliais, 0)} x ${formatCurrency(valorBase)}`
      : `Filiais x ${formatPercent(percentualFiliais, 0)} x ${formatCurrency(valorBase)}`

  const faturamentoTooltipText = `${faturamentoCalculoText}\n${filiaisCalculoText}`

  const toggleSegmento = (segmento) => {
    const atualizado = segmentosSelecionados.includes(segmento)
      ? segmentosSelecionados.filter((item) => item !== segmento)
      : [...segmentosSelecionados, segmento]

    setDados({ ...dados, segmento: atualizado })
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-slate-900">Dados do Cliente</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <span>Regime Tributário</span>
            <TooltipInfo text={regimeTooltipText} />
          </div>
          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
            value={dados.regime}
            onChange={(e) => setDados({ ...dados, regime: e.target.value })}
          >
            <option value="">Selecione o regime tributario</option>
            <option value="Simples Nacional">Simples Nacional</option>
            <option value="Lucro Presumido">Lucro Presumido</option>
            <option value="Lucro Real">Lucro Real</option>
            <option value="Isento/Imune">Isento/Imune</option>
            <option value="PF/Livro Caixa">PF/Livro Caixa</option>
          </select>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <span>Segmento</span>
            <TooltipInfo text={segmentoTooltipText} />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SEGMENTOS.map((segmento) => {
              const ativo = segmentosSelecionados.includes(segmento)

              return (
                <label
                  key={segmento}
                  className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-center text-xs font-medium transition-colors ${
                    ativo
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-400"
                  }`}
                >
                  <input
                    checked={ativo}
                    className="sr-only"
                    type="checkbox"
                    onChange={() => toggleSegmento(segmento)}
                  />
                  {segmento}
                </label>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <span>Faturamento Mensal Médio</span>
              <TooltipInfo text={faturamentoTooltipText} />
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">R$</span>
              <input
                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
                inputMode="decimal"
                placeholder="Ex. 35.000"
                type="text"
                value={formatLocalizedNumber(dados.faturamento)}
                onChange={(e) =>
                  setDados({ ...dados, faturamento: parseLocalizedNumber(e.target.value) })
                }
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Sócios</label>
            <input
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
              inputMode="decimal"
              placeholder="Ex. 1"
              type="text"
              value={formatLocalizedNumber(dados.socios)}
              onChange={(e) => setDados({ ...dados, socios: parseLocalizedNumber(e.target.value) })}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Funcionários</label>
            <input
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
              inputMode="decimal"
              placeholder="Ex. 1"
              type="text"
              value={formatLocalizedNumber(dados.funcionarios)}
              onChange={(e) =>
                setDados({ ...dados, funcionarios: parseLocalizedNumber(e.target.value) })
              }
            />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <span>Filiais</span>
              <TooltipInfo text={filiaisCalculoText} />
            </div>
            <input
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
              inputMode="decimal"
              placeholder="Ex. 1"
              type="text"
              value={formatLocalizedNumber(dados.filiais)}
              onChange={(e) => setDados({ ...dados, filiais: parseLocalizedNumber(e.target.value) })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-medium text-slate-700">
                Percentual de faturamento
              </span>
              <span className="font-semibold text-blue-700">{percentualFaturamento}%</span>
            </div>
            <input
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
              max={PERCENTUAL_MAX}
              min={PERCENTUAL_MIN}
              step="0.05"
              type="range"
              value={dados.porcFaturamento || 10}
              onChange={(e) =>
                setDados({ ...dados, porcFaturamento: Number(e.target.value || 10) })
              }
            />
            <p className="mt-2 text-xs text-slate-600">
              Acrescimo gerado: <strong>{formatCurrency(resultado?.acresFaturamento)}</strong>
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">Percentual por filial</span>
              <span className="font-semibold text-blue-700">{percentualFiliais}%</span>
            </div>
            <input
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
              max={PORC_FILIAIS_MAX}
              min={PORC_FILIAIS_MIN}
              step="5"
              type="range"
              value={percentualFiliais}
              onChange={(e) =>
                setDados({ ...dados, porcFiliais: Number(e.target.value || 10) / 100 })
              }
            />
            <p className="mt-2 text-xs text-slate-600">
              Acrescimo gerado: <strong>{formatCurrency(resultado?.filiaisValor)}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


