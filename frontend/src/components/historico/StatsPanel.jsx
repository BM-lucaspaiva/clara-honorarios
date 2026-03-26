export default function StatsPanel() {
  const activeDeals = 145;
  const monthlyGoal = 200;
  const growth = 12;
  const progress = (activeDeals / monthlyGoal) * 100;
  const remaining = monthlyGoal - activeDeals;

  return (
    <div className="space-y-6">
      <button
        type="button"
        className="flex w-full items-center justify-center rounded-xl bg-blue-700 px-6 py-5 text-lg font-semibold text-white shadow-sm transition hover:bg-blue-800"
      >
        + ADICIONAR CÁLCULO
      </button>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700 text-white">
            ◫
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">
            Negócios Ativos
          </h3>
        </div>

        <div className="mt-6 text-7xl font-bold text-blue-700">
          {activeDeals}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
            ↗ {growth}%
          </span>
          <p className="text-sm text-gray-500">
            Cálculos realizados com sucesso (30d).
          </p>
        </div>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
            <span>Meta Mensal</span>
            <span>{activeDeals} / {monthlyGoal}</span>
          </div>

          <div className="h-3 w-full rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-blue-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-3 text-center text-sm text-gray-400">
            Faltam {remaining} para a meta
          </p>
        </div>
      </div>
    </div>
  );
}