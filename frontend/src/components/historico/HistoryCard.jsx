import { formatCurrency, formatHistoryDate } from "../../utils/historico/historico";

export default function HistoryCard({ item, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(item)}
      className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-left shadow-sm transition hover:border-blue-200 hover:shadow"
    >
      <div className="flex items-stretch justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-gray-900">
            {item.companyName}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Sócio: {item.partnerName}
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Empresa(s) do orçamento:
          </p>

          <p className="mt-1 text-sm font-medium text-gray-700">
            {item.quotedCompanies.join(", ")}
          </p>
        </div>

        <div className="flex w-40 shrink-0 flex-col items-end justify-between text-right sm:w-48">
          <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
            {formatHistoryDate(item.updatedAt)}
          </span>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Valor médio
            </p>

            <p className="mt-1 text-base font-semibold text-blue-700">
              {formatCurrency(item.averageProposalValue)}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
