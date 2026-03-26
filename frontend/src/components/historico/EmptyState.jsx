export default function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
      <h3 className="text-lg font-semibold text-gray-800">
        Nenhum cálculo encontrado
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        Tente buscar por nome da empresa, sócio ou empresa do orçamento.
      </p>
    </div>
  );
}