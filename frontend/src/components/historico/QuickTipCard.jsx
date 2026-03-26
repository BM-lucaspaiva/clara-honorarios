export default function QuickTipCard() {
  return (
    <div className="rounded-2xl bg-blue-50 p-6 shadow-sm">
      <h3 className="flex items-center gap-2 text-2xl font-semibold text-blue-700">
        <span>◔</span>
        Dica Rápida
      </h3>

      <p className="mt-4 text-lg leading-8 text-blue-700">
        Exporte seus cálculos em <strong>PDF</strong> ou <strong>planilha</strong>{" "}
        clicando no botão de exportar dentro de cada empresa.
      </p>
    </div>
  );
}