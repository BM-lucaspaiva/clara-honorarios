export default function StatsPanel() {
  const total = 145
  const growth = 12

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Negócios Ativos
        </h2>

        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black tracking-tighter text-blue-700">
            {total}
          </span>

          <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
            <span className="material-symbols-outlined text-xs">
              arrow_upward
            </span>
            {growth}%
          </span>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-4 font-bold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-xl">add_circle</span>
        Novo Cálculo
      </button>
    </div>
  )
}