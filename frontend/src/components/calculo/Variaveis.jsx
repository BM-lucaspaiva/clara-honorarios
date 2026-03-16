import { formatCurrency } from "../../utils/calculo/helpers"

const INTEGRACOES = [
  { key: "niboDocs", label: "Nibo (Docs + CC)" },
  { key: "niboGF", label: "Nibo (GF Plus)" },
  { key: "hubcount", label: "Hubcount" },
  { key: "bragaOnline", label: "Braga Online" },
  { key: "centroCustos", label: "Centro de Custos" },
  { key: "crfBasico", label: "CRF Basico" },
  { key: "crfCompleto", label: "CRF Completo" },
]

const FREQ_MAP = {
  Semestral: 0.15 / 5.8,
  Trimestral: 0.15 / 2.8,
  Bimestral: 0.15 / 1.8,
  Mensal: 0.15,
}

export default function Variaveis({ dados, setDados, integracoes, setIntegracoes, resultado }) {
  const salarioMinimo = Number(dados.salarioMinimo || 0)
  const fatorBalancete = FREQ_MAP[dados.balancete] || 0
  const fatorReuniao = FREQ_MAP[dados.reuniao] || 0

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-slate-900">Variaveis / Integracoes</h2>
      </div>

      <p className="mb-4 text-sm text-slate-600">
        Selecione as variaveis utilizadas pelo cliente para aplicar os ajustes no calculo.
      </p>

      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Balancete</label>
          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
            value={dados.balancete}
            onChange={(e) => setDados({ ...dados, balancete: e.target.value })}
          >
            <option value="">Anual</option>
            <option value="Semestral">Semestral</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Bimestral">Bimestral</option>
            <option value="Mensal">Mensal</option>
          </select>
          <p className="mt-2 text-xs text-slate-500">
            Calculo: {formatCurrency(salarioMinimo)} x {fatorBalancete.toFixed(4)} = {formatCurrency(resultado?.balanceteValor)}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Reuniao</label>
          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
            value={dados.reuniao}
            onChange={(e) => setDados({ ...dados, reuniao: e.target.value })}
          >
            <option value="">Anual</option>
            <option value="Semestral">Semestral</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Bimestral">Bimestral</option>
            <option value="Mensal">Mensal</option>
          </select>
          <p className="mt-2 text-xs text-slate-500">
            Calculo: {formatCurrency(salarioMinimo)} x {fatorReuniao.toFixed(4)} = {formatCurrency(resultado?.reuniaoValor)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {INTEGRACOES.map((item) => (
          <label
            key={item.key}
            className={`group relative flex min-h-24 cursor-pointer items-center justify-center rounded-xl border-2 p-4 text-center text-sm font-semibold transition-all ${
              integracoes[item.key]
                ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-slate-50"
            }`}
          >
            <input
              checked={Boolean(integracoes[item.key])}
              className="sr-only"
              type="checkbox"
              onChange={(e) =>
                setIntegracoes({ ...integracoes, [item.key]: e.target.checked })
              }
            />
            <span
              className={`absolute right-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold transition-colors ${
                integracoes[item.key]
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-white text-transparent group-hover:border-blue-300"
              }`}
            >
              OK
            </span>
            {item.label}
          </label>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Calculo das integracoes: soma das integracoes marcadas = {formatCurrency(resultado?.integracoesValor)}.
      </p>
    </section>
  )
}
