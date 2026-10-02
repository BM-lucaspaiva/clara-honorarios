import { PRESTADORAS } from "../../data/prestadoras"
import { formatarCnpj } from "../../utils/empresa/formatarCnpj"

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"

const labelClass = "mb-2 block text-sm font-medium text-slate-700"

export default function DadosEmpresa({ empresa, setEmpresa }) {
  const atualizarCampo = (campo) => (event) => {
    setEmpresa((atual) => ({ ...atual, [campo]: event.target.value }))
  }
  const atualizarCnpj = (event) => {
    const cnpj = formatarCnpj(event.target.value)
    setEmpresa((atual) => ({ ...atual, cnpj }))
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-8">
        <div className="mb-6 border-b border-slate-200 pb-4">
          <h2 className="text-xl font-semibold text-slate-900">Informações da Empresa</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="empresa-prestadora">Empresa prestadora do serviço</label>
            <select
              className={inputClass}
              id="empresa-prestadora"
              value={empresa.prestadoraServico}
              onChange={atualizarCampo("prestadoraServico")}
            >
              <option value="">Selecione a empresa prestadora</option>
              {PRESTADORAS.map((prestadora) => (
                <option key={prestadora.razaoSocial} value={prestadora.razaoSocial}>{prestadora.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="nome-empresa">Nome da Empresa</label>
            <input
              className={inputClass}
              id="nome-empresa"
              autoComplete="organization"
              placeholder="Razão social"
              type="text"
              value={empresa.nomeEmpresa}
              onChange={atualizarCampo("nomeEmpresa")}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="nome-fantasia">Nome Fantasia</label>
            <input
              className={inputClass}
              id="nome-fantasia"
              placeholder="Nome comercial"
              type="text"
              value={empresa.nomeFantasia}
              onChange={atualizarCampo("nomeFantasia")}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="cnpj-empresa">CNPJ da Empresa</label>
            <input
              className={inputClass}
              id="cnpj-empresa"
              inputMode="numeric"
              maxLength={18}
              placeholder="00.000.000/0000-00"
              type="text"
              value={empresa.cnpj}
              onChange={atualizarCnpj}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="data-inicio">Data de Início</label>
            <input
              className={inputClass}
              id="data-inicio"
              type="date"
              value={empresa.dataInicio}
              onChange={atualizarCampo("dataInicio")}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="atividades-empresa">Atividades da Empresa</label>
            <textarea
              className={`${inputClass} min-h-28 resize-y`}
              id="atividades-empresa"
              placeholder="Descreva as principais atividades"
              rows={4}
              value={empresa.atividades}
              onChange={atualizarCampo("atividades")}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="contabilidade-anterior">Contabilidade Anterior</label>
            <input
              className={inputClass}
              id="contabilidade-anterior"
              placeholder="Nome do escritório ou profissional anterior"
              type="text"
              value={empresa.contabilidadeAnterior}
              onChange={atualizarCampo("contabilidadeAnterior")}
            />
          </div>
        </div>
      </section>

      <section className="self-start rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-4">
        <div className="mb-6 border-b border-slate-200 pb-4">
          <h2 className="text-xl font-semibold text-slate-900">Dados para Contato</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <label className={labelClass} htmlFor="nome-contato">Nome</label>
            <input
              className={inputClass}
              id="nome-contato"
              autoComplete="name"
              placeholder="Pessoa de contato"
              type="text"
              value={empresa.contatoNome}
              onChange={atualizarCampo("contatoNome")}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="celular-contato">Celular</label>
            <input
              className={inputClass}
              id="celular-contato"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              type="tel"
              value={empresa.contatoCelular}
              onChange={atualizarCampo("contatoCelular")}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="email-contato">E-mail</label>
            <input
              className={inputClass}
              id="email-contato"
              autoComplete="email"
              placeholder="contato@empresa.com.br"
              type="email"
              value={empresa.contatoEmail}
              onChange={atualizarCampo("contatoEmail")}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
