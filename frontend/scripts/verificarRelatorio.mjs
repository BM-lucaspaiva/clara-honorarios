import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

import Docxtemplater from "docxtemplater"
import PizZip from "pizzip"
import { PRESTADORAS } from "../src/data/prestadoras.js"
import { dadosDoRelatorio, gerarRelatorioHonorarios } from "../src/services/geradorRelatorioService.js"
import { formatarCnpj } from "../src/utils/empresa/formatarCnpj.js"
import { dataFuturaValida, dataLocalISO, proximaDataLocalISO, validarRelatorio } from "../src/utils/relatorio/validarRelatorio.js"

{
  const simulacao = {
    empresa: {
      nomeEmpresa: "Cliente & Filhos",
      prestadoraServico: PRESTADORAS[0].razaoSocial,
      nomeFantasia: "Loja Exemplo",
      cnpj: "12345678000190",
      dataInicio: proximaDataLocalISO(),
      atividades: "Comércio de livros",
      contatoNome: "Ana",
      contatoCelular: "(11) 99999-9999",
      contatoEmail: "ana@exemplo.com",
      contabilidadeAnterior: "",
    },
    dados: {
      salarioMinimo: 1518,
      funcionarios: 4,
      regime: "Simples Nacional",
      faturamento: 10000,
      segmento: ["Comércio"],
      balancete: "Mensal",
      socios: 2,
      filiais: 0,
      reuniao: "Trimestral",
      observacoes: [{ nome: "Serviço extra", valor: "25,20" }],
    },
    integracoes: { niboDocs: true, crfBasico: true },
    resultado: { honorarioTotal: 1234.56, funcionariosValor: 200.25, sociosValor: 92.75 },
  }
  const valores = dadosDoRelatorio(simulacao)

  assert.equal(formatarCnpj("1234567800019"), "1234567800019")
  assert.equal(formatarCnpj("12345678000190"), "12.345.678/0001-90")
  assert.equal(formatarCnpj("12.345.678/0001-9"), "1234567800019")
  assert.equal(valores.empresa, "Cliente & Filhos")
  assert.equal(valores.cnpj, "12.345.678/0001-90")
  assert.equal(valores.contratada_stc, "X")
  assert.equal(valores.contratada_braga, "")
  assert.equal(valores.contratada_eqpm, "")
  assert.equal(valores.plano_stc, "X")
  assert.equal(valores.plano_bm, "")
  assert.equal(valores.crf_basico, "X")
  assert.equal(valores.faturamento, "10.000,00")
  assert.equal(valores.honorario, "1.234,56")
  assert.equal(valores.data_inicio, simulacao.empresa.dataInicio.split("-").reverse().join("/"))
  assert.equal(valores.pro_labore, "293,00")
  assert.deepEqual(validarRelatorio(simulacao), { empresa: [], calculo: [] })
  assert.equal(dataFuturaValida("2026-10-01", new Date(2026, 9, 1)), false)
  assert.equal(dataFuturaValida("2026-10-02", new Date(2026, 9, 1)), true)
  assert.equal(dataFuturaValida("2026-02-30", new Date(2026, 0, 1)), false)
  assert.equal(proximaDataLocalISO(new Date(2026, 11, 31)), "2027-01-01")
  const incompleta = validarRelatorio({
    empresa: { ...simulacao.empresa, nomeEmpresa: "", dataInicio: dataLocalISO() },
    dados: { ...simulacao.dados, regime: "", segmento: [], funcionarios: "" },
  })
  assert.deepEqual(incompleta.empresa, ["Nome da Empresa", "Data de Início (posterior a hoje)"])
  assert.deepEqual(incompleta.calculo, ["Regime Tributário", "Segmento", "Funcionários"])
  for (const prestadora of PRESTADORAS) {
    const campos = dadosDoRelatorio({
      ...simulacao,
      empresa: { ...simulacao.empresa, prestadoraServico: prestadora.razaoSocial },
    })
    for (const campo of ["contratada_braga", "contratada_eqpm", "contratada_stc"]) {
      assert.equal(campos[campo], campo === prestadora.campoContratada ? "X" : "")
    }
    assert.equal(campos.plano_stc, prestadora.plano === "plano_stc" ? "X" : "")
    assert.equal(campos.plano_bm, prestadora.plano === "plano_bm" ? "X" : "")
  }
  await assert.rejects(
    gerarRelatorioHonorarios({ ...simulacao, empresa: { ...simulacao.empresa, cnpj: "1234567800019" } }),
    (error) => error.pendencias?.empresa.includes("CNPJ da Empresa (14 dígitos)"),
  )
  await assert.rejects(
    gerarRelatorioHonorarios({ ...simulacao, empresa: { ...simulacao.empresa, dataInicio: dataLocalISO() } }),
    (error) => error.pendencias?.empresa.includes("Data de Início (posterior a hoje)"),
  )

  const modelo = path.resolve("public/templates/Modelo de Ficha de Entrada - Contabilidade.docx")
  const zipModelo = new PizZip(fs.readFileSync(modelo))
  const textoModelo = [...zipModelo.file("word/document.xml").asText().matchAll(/<w:t(?:\s[^>]*)?>(.*?)<\/w:t>/gs)]
    .map((match) => match[1])
    .join("")
  for (const [, campo] of textoModelo.matchAll(/\{([a-z_]+)\}/gi)) {
    assert.ok(Object.hasOwn(valores, campo), `Campo sem correspondência: ${campo}`)
  }

  const doc = new Docxtemplater(zipModelo, {
    paragraphLoop: true,
    linebreaks: true,
  })
  doc.render(valores)
  const saida = new PizZip(doc.getZip().generate({ type: "nodebuffer" }))
  const xml = saida.file("word/document.xml").asText()

  for (const esperado of ["Cliente &amp; Filhos", "12.345.678/0001-90", "Simples Nacional", "Comércio de livros", "1.234,56", valores.data_inicio, "293,00", "Serviço extra"]) {
    assert.ok(xml.includes(esperado), `Não encontrou ${esperado} no documento`)
  }
  const textoDocumento = [...xml.matchAll(/<w:t(?:\s[^>]*)?>(.*?)<\/w:t>/gs)]
    .map((match) => match[1])
    .join("")
  assert.ok(!/\{[a-z_]+\}/i.test(textoDocumento), "Há marcadores sem preenchimento")
  for (const arquivo of Object.keys(new PizZip(fs.readFileSync(modelo)).files)) {
    if (arquivo.startsWith("word/media/")) assert.ok(saida.file(arquivo), `Imagem perdida: ${arquivo}`)
  }
  console.log("Relatório DOCX preenchido e validado.")
  if (process.argv.includes("--salvar-exemplo")) {
    const diretorio = fs.mkdtempSync(path.join(os.tmpdir(), "relatorio-honorarios-"))
    const arquivo = path.join(diretorio, "relatorio-exemplo.docx")
    fs.writeFileSync(arquivo, saida.generate({ type: "nodebuffer" }))
    console.log(arquivo)
  }
}
