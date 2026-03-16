const INTEGRACOES = [
  { key: "niboDocs", label: "Nibo (Docs + CC)" },
  { key: "niboGF", label: "Nibo (GF Plus)" },
  { key: "hubcount", label: "Hubcont" },
  { key: "bragaOnline", label: "Braga Online" },
  { key: "centroCustos", label: "Centro de Custos" },
  { key: "crfBasico", label: "CRF Básico" },
  { key: "crfCompleto", label: "CRF Completo" },
]

export default function Variaveis({ dados, setDados, integracoes, setIntegracoes }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-slate-900">Variáveis / Integrações</h2>
      </div>

      <p className="mb-4 text-sm text-slate-600">
        Selecione as variáveis utilizadas pelo cliente para aplicar os ajustes no cálculo.
      </p>

      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Balancete</label>
          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
            value={dados.balancete}
            onChange={(e) => setDados({ ...dados, balancete: e.target.value })}
          >
            <option value="">Sem balancete</option>
            <option value="Semestral">Semestral</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Bimestral">Bimestral</option>
            <option value="Mensal">Mensal</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Reunião</label>
          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
            value={dados.reuniao}
            onChange={(e) => setDados({ ...dados, reuniao: e.target.value })}
          >
            <option value="">Sem reunião</option>
            <option value="Semestral">Semestral</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Bimestral">Bimestral</option>
            <option value="Mensal">Mensal</option>
          </select>
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
    </section>
  )
}
