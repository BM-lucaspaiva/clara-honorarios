const companies = [
  { name: "BM Prime", total: 12, badge: "primary" },
  { name: "SmartTalents", total: 8, badge: "secondary" },
  { name: "SmartFin", total: 6, badge: "neutral" },
  { name: "SmartCount", total: 5, badge: "neutral" },
  { name: "Outros", total: 114, badge: "neutral" },
]

function badgeClass(type) {
  switch (type) {
    case "primary":
      return "bg-blue-100 text-blue-800"
    case "secondary":
      return "bg-slate-200 text-slate-800"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

export default function VolumeByCompany() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900">
        <span className="material-symbols-outlined text-lg text-blue-700">
          analytics
        </span>
        Volume por Empresa
      </h3>

      <div className="space-y-4">
        {companies.map((company, index) => (
          <div
            key={company.name}
            className={`flex items-center justify-between ${
              index !== companies.length - 1 ? "border-b border-slate-100 pb-3" : ""
            }`}
          >
            <span className="text-sm font-medium text-slate-600">
              {company.name}
            </span>

            <span
              className={`rounded-lg px-3 py-1 text-[11px] font-bold ${badgeClass(company.badge)}`}
            >
              {company.total}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-8 block w-full text-center text-[10px] font-bold uppercase tracking-widest text-blue-700 transition hover:underline"
      >
        Ver Relatório Completo
      </button>
    </div>
  )
}