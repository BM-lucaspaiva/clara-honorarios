function criarObservacaoVazia() {
  return { nome: "", valor: "" }
}

function normalizarObservacoes(observacoes) {
  if (!Array.isArray(observacoes) || observacoes.length === 0) {
    return [criarObservacaoVazia()]
  }

  return observacoes
}

export default function Observacoes({ dados, setDados }) {
  const observacoes = normalizarObservacoes(dados.observacoes)

  const atualizarObservacoes = (proximasObservacoes) => {
    setDados({ ...dados, observacoes: proximasObservacoes })
  }

  const adicionarObservacao = () => {
    atualizarObservacoes([...observacoes, criarObservacaoVazia()])
  }

  const removerObservacao = (indice) => {
    const restantes = observacoes.filter((_, index) => index !== indice)
    atualizarObservacoes(restantes.length > 0 ? restantes : [criarObservacaoVazia()])
  }

  const alterarCampo = (indice, campo, valor) => {
    const proximasObservacoes = observacoes.map((observacao, index) =>
      index === indice ? { ...observacao, [campo]: valor } : observacao,
    )

    atualizarObservacoes(proximasObservacoes)
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-slate-900">Observações</h2>
      </div>

      <div className="mb-2 hidden grid-cols-12 gap-3 px-1 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
        <p className="md:col-span-5">Nome</p>
        <p className="md:col-span-4">Valor (R$)</p>
        <p className="md:col-span-3">Ações</p>
      </div>

      <div className="space-y-3">
        {observacoes.map((observacao, indice) => (
          <div
            key={`observacao-${indice}`}
            className="grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 md:grid-cols-12"
          >
            <div className="md:col-span-5">
              <label className="mb-1 block text-xs font-medium text-slate-600 md:hidden">Nome</label>
              <input
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
                placeholder="Ex. Servico extraordinario"
                type="text"
                value={observacao?.nome || ""}
                onChange={(event) => alterarCampo(indice, "nome", event.target.value)}
              />
            </div>

            <div className="md:col-span-4">
              <label className="mb-1 block text-xs font-medium text-slate-600 md:hidden">Valor (R$)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">R$</span>
                <input
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
                  inputMode="decimal"
                  placeholder="Ex. 25,20"
                  type="text"
                  value={observacao?.valor || ""}
                  onChange={(event) =>
                    alterarCampo(indice, "valor", event.target.value.replace(/[^\d,.-]/g, ""))
                  }
                />
              </div>
            </div>

            <div className="flex gap-2 md:col-span-3 md:justify-end">
              <button
                className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100"
                title="Adicionar observacao"
                type="button"
                onClick={adicionarObservacao}
              >
                +
              </button>
              <button
                aria-label={indice === 0 ? "Nao e possivel excluir a primeira linha" : "Excluir observacao"}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                  indice === 0
                    ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                    : "border-red-200 bg-red-50 text-red-700 hover:border-red-300 hover:bg-red-100"
                }`}
                disabled={indice === 0}
                title={indice === 0 ? "A primeira linha nao pode ser excluida" : "Excluir observacao"}
                type="button"
                onClick={() => removerObservacao(indice)}
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12a1 1 0 0 0 1 .9h6a1 1 0 0 0 1-.9L17 7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
