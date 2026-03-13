import { formatLocalizedNumber, parseLocalizedNumber } from "../../utils/calculo/helpers"

export default function DadosCliente({ dados, setDados }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-slate-900">Dados do Cliente</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Regime tributário</label>
          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
            value={dados.regime}
            onChange={(e) => setDados({ ...dados, regime: e.target.value })}
          >
            <option value="">Selecione o regime tributário</option>
            <option value="Simples Nacional">Simples Nacional</option>
            <option value="Lucro Presumido">Lucro Presumido</option>
            <option value="Lucro Real">Lucro Real</option>
            <option value="Isento/Imune">Isento/Imune</option>
            <option value="PF/Livro Caixa">PF/Livro Caixa</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Segmento</label>
          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
            value={dados.segmento}
            onChange={(e) => setDados({ ...dados, segmento: e.target.value })}
          >
            <option value="">Selecione o segmento</option>
            <option value="Prestação de Serviços">Prestação de Serviços</option>
            <option value="Comércio">Comércio</option>
            <option value="Indústria">Indústria</option>
            <option value="Construção Civil">Construção Civil</option>
            <option value="Holding">Holding</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Faturamento mensal médio</label>
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

        <div className="grid grid-cols-3 gap-4">
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Nº funcionários</label>
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Nº filiais</label>
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
      </div>
    </section>
  )
}
