export default function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        Nenhum cálculo encontrado
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Tente pesquisar por empresa, sócio ou empresa do orçamento.
      </p>
    </div>
  )
}