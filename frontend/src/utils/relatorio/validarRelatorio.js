import { PRESTADORAS } from "../../data/prestadoras.js"
import { digitosDoCnpj } from "../empresa/formatarCnpj.js"

const preenchido = (valor) => String(valor ?? "").trim() !== ""
const numeroValido = (valor, minimo = 0, inteiro = false) =>
  preenchido(valor) && Number.isFinite(Number(valor)) && Number(valor) >= minimo &&
  (!inteiro || Number.isInteger(Number(valor)))

export function dataLocalISO(data = new Date()) {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, "0")
  const dia = String(data.getDate()).padStart(2, "0")
  return `${ano}-${mes}-${dia}`
}

export function proximaDataLocalISO(data = new Date()) {
  const amanha = new Date(data.getFullYear(), data.getMonth(), data.getDate() + 1)
  return dataLocalISO(amanha)
}

export function dataFuturaValida(valor, hoje = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor ?? "")) return false
  const [ano, mes, dia] = valor.split("-").map(Number)
  const data = new Date(ano, mes - 1, dia)
  return data.getFullYear() === ano && data.getMonth() + 1 === mes &&
    data.getDate() === dia && valor > dataLocalISO(hoje)
}

export function validarRelatorio({ empresa = {}, dados = {} }, hoje = new Date()) {
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
  if (!dataFuturaValida(empresa.dataInicio, hoje)) pendencias.empresa.push("Data de Início (posterior a hoje)")
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

export function erroDeValidacaoRelatorio(simulacao, hoje = new Date()) {
  const pendencias = validarRelatorio(simulacao, hoje)
  if (!pendencias.empresa.length && !pendencias.calculo.length) return null
  const erro = new Error("Preencha ou corrija os campos indicados antes de gerar o relatório.")
  erro.pendencias = pendencias
  return erro
}
