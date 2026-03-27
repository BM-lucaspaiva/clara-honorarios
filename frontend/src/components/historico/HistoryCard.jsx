import { formatCurrency, formatHistoryDate } from "../../utils/historico/historico"

export default function HistoryCard({ item, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(item)}
      className="w-full rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-700">
            Empresa
          </p>
          <h3 className="mt-1 truncate text-lg font-semibold text-slate-900">
            {item.companyName}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Sócio: {item.partnerName}
          </p>
        </div>

        <div className="min-w-[220px] lg:w-[220px]">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Empresa do orçamento
          </p>
          <p className="mt-1 text-sm text-slate-700">
            {item.quotedCompanies.join(", ")}
          </p>
        </div>

        <div className="min-w-[150px] lg:w-[150px]">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Data de criação
          </p>
          <p className="mt-1 text-sm font-medium text-slate-800">
            {formatHistoryDate(item.createdAt)}
          </p>
        </div>

        <div className="min-w-[150px] lg:w-[150px] lg:text-right">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Valor médio
          </p>
          <p className="mt-1 text-lg font-semibold text-blue-700">
            {formatCurrency(item.averageValue)}
          </p>
        </div>
      </div>
    </button>
  )
}