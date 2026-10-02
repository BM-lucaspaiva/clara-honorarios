import { PRESTADORAS } from "../../data/prestadoras.js"
import { digitosDoCnpj } from "../empresa/formatarCnpj.js"

const preenchido = (valor) => String(valor ?? "").trim() !== ""
const numeroValido = (valor, minimo = 0, inteiro = false) =>
  preenchido(valor) && Number.isFinite(Number(valor)) && Number(valor) >= minimo &&
  (!inteiro || Number.isInteger(Number(valor)))

export function dataValida(valor) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor ?? "")) return false
  const [ano, mes, dia] = valor.split("-").map(Number)
  const data = new Date(ano, mes - 1, dia)
  return data.getFullYear() === ano && data.getMonth() + 1 === mes &&
    data.getDate() === dia
}

export function validarRelatorio({ empresa = {}, dados = {} }) {
  const pendencias = { empresa: [], calculo: [] }
  const exigirTexto = (objeto, campo, nome, grupo) => {
    if (!preenchido(objeto[campo])) pendencias[grupo].push(nome)
  }

  if (!PRESTADORAS.some((item) => item.razaoSocial === empresa.prestadoraServico)) {
    pendencias.empresa.push("Empresa prestadora do serviço")
  }
  exigirTexto(empresa, "nomeEmpresa", "Nome da Empresa", "empresa")
  exigirTexto(empresa, "nomeFantasia", "Nome Fantasia", "empresa")
  if (digitosDoCnpj(empresa.cnpj).length !== 14) pendencias.empresa.push("CNPJ da Empresa (14 dígitos)")
  if (!dataValida(empresa.dataInicio)) pendencias.empresa.push("Data de Início (data válida)")
  exigirTexto(empresa, "atividades", "Atividades da Empresa", "empresa")
  exigirTexto(empresa, "contatoNome", "Nome do contato", "empresa")
  exigirTexto(empresa, "contatoCelular", "Celular do contato", "empresa")
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(empresa.contatoEmail ?? "").trim())) {
    pendencias.empresa.push("E-mail do contato")
  }

  if (!numeroValido(dados.salarioMinimo, 0.01)) pendencias.calculo.push("Salário Mínimo")
  exigirTexto(dados, "regime", "Regime Tributário", "calculo")
  if (!Array.isArray(dados.segmento) || dados.segmento.length === 0) pendencias.calculo.push("Segmento")
  if (!numeroValido(dados.faturamento)) pendencias.calculo.push("Faturamento Mensal Médio")
  if (!numeroValido(dados.socios, 0, true)) pendencias.calculo.push("Sócios")
  if (!numeroValido(dados.funcionarios, 0, true)) pendencias.calculo.push("Funcionários")
  if (!numeroValido(dados.filiais, 0, true)) pendencias.calculo.push("Filiais")
  exigirTexto(dados, "balancete", "Balancete", "calculo")
  exigirTexto(dados, "reuniao", "Reunião", "calculo")

  return pendencias
}

export function erroDeValidacaoRelatorio(simulacao) {
  const pendencias = validarRelatorio(simulacao)
  if (!pendencias.empresa.length && !pendencias.calculo.length) return null
  const erro = new Error("Preencha ou corrija os campos indicados antes de gerar o relatório.")
  erro.pendencias = pendencias
  return erro
}
