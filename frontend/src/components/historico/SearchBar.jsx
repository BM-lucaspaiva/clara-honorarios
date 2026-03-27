export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Nome da empresa, sócio ou empresa do orçamento..."
          className="w-full rounded-lg border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-200"
      >
        <span className="material-symbols-outlined text-lg text-slate-600">
          filter_list
        </span>
        <span className="hidden sm:inline">Filtros</span>
      </button>
    </div>
  )
}