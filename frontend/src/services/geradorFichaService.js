// src/services/gerarFichaCliente.js

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

// ======================================================
// GERAR FICHA DE ENTRADA DO CLIENTE
// ======================================================

export async function gerarFichaCliente(dados) {
  try {
    // ==================================================
    // 1. CARREGAR O MODELO DOCX
    // ==================================================

    const response = await fetch(
      "/templates/Questionário para Honorários.docx"
    );

    if (!response.ok) {
      throw new Error(
        "Não foi possível carregar o modelo da ficha."
      );
    }

    const arquivo = await response.arrayBuffer();

    // ==================================================
    // 2. ABRIR O DOCUMENTO
    // ==================================================

    const zip = new PizZip(arquivo);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // ==================================================
    // 3. PREENCHER OS CAMPOS DO WORD
    // ==================================================

    doc.render(dados);

    // ==================================================
    // 4. GERAR O NOVO ARQUIVO DOCX
    // ==================================================

    const blob = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // ==================================================
    // 5. DEFINIR NOME DO ARQUIVO
    // ==================================================

    const nomeCliente =
      dados.fantasia ||
      dados.empresa ||
      dados.nome ||
      "cliente";

    // ==================================================
    // 6. FAZER DOWNLOAD
    // ==================================================

    saveAs(
      blob,
      `Ficha_Entrada_${nomeCliente}.docx`
    );
  } catch (error) {
    console.error(
      "Erro ao gerar ficha:",
      error
    );

    throw error;
  }
}