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

const PERCENTUAL_MIN = 0.10
const PERCENTUAL_MAX = 0.50
const PORC_FILIAIS_MIN = 0.10
const PORC_FILIAIS_MAX = 0.50

function TooltipInfo({ text }) {
  return (
    <span className="group relative inline-flex">
      <span
        className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-slate-300 text-[10px] font-bold text-slate-500 transition-colors group-hover:border-blue-400 group-hover:text-blue-600"
        tabIndex={0}
      >
        ?
      </span>
      <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-30 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-normal leading-4 text-slate-600 opacity-0 shadow-lg transition-all duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
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
  const percentualFiliais = Number(dados.porcFiliais || 0)

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
            <span>Regime tributario</span>
            <TooltipInfo text="Logica: valor base x percentual do regime selecionado." />
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
            <TooltipInfo text="Logica: soma de percentuais por segmento sobre o valor base, com fator redutor para combinacoes." />
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Faturamento mensal medio</label>
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Nº Socios</label>
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Nº Funcionarios</label>
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Nº Filiais</label>
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
                <TooltipInfo text="Logica: se faturamento for ate 15 mil, nao gera acrescimo; acima disso aplica percentual informado." />
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
              <span className="flex items-center gap-2 font-medium text-slate-700">
                Percentual por filial
                <TooltipInfo text="Logica: quantidade de filiais x percentual por filial x valor base." />
              </span>
              <span className="font-semibold text-blue-700">{percentualFiliais}%</span>
            </div>
            <input
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
              max={PORC_FILIAIS_MAX}
              min={PORC_FILIAIS_MIN}
              step="0.05"
              type="range"
              value={dados.porcFiliais || 10}
              onChange={(e) => setDados({ ...dados, porcFiliais: Number(e.target.value || 10) })}
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
