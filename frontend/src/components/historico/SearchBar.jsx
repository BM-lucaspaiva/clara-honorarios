export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <span className="text-lg text-blue-600">⌕</span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar por Empresa, Sócio ou Empresa do Orçamento..."
        className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
      />

      <button
        type="button"
        className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-500"
      >
        ☷
      </button>
    </div>
  );
}