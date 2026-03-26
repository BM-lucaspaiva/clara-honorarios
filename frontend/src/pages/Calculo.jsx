import { useState } from "react"
import { Link } from "react-router-dom"

import React from "react"

import BaseCalculo from "../components/calculo/BaseCalculo"
import DadosCliente from "../components/calculo/DadosCliente"
import Observacoes from "../components/calculo/Observacoes"
import ResumoHonorario from "../components/calculo/ResumoHonorario"
import Variaveis from "../components/calculo/Variaveis"
import { calcularHonorario } from "../utils/calculo/calcularHonorario"
import Header from "../components/general/Header"

export default function Calculo() {
  const [dados, setDados] = useState({
    salarioMinimo: 1621,
    percentual: 1.0,
    imposto: 0.12,
    porcFiliais: 0.25,
    porcFaturamento: 0.20,
    pisoPersonalizado: "",

    regime: "",
    segmento: [],

    faturamento: "",
    funcionarios: "",
    filiais: "",
    socios: "",

    balancete: "",
    reuniao: "",
    observacoes: [{ nome: "", valor: "" }],
  })

  const [integracoes, setIntegracoes] = useState({
    niboDocs: false,
    niboGF: false,
    hubcont: false,
    bragaOnline: false,
    centroCustos: false,
    crfBasico: false,
    crfCompleto: false,
  })

  const resultado = calcularHonorario(dados, integracoes)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Cálculo de Honorários</h1>
          <p className="mt-2 text-slate-600">
            Preencha os dados abaixo para simular os honorários contábeis.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <section className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-blue-700">Empresa da simulação</p>
              <h3 className="mt-1 text-lg font-semibold text-blue-900">Grupo BM Soluções</h3>
            </section>

            <BaseCalculo dados={dados} resultado={resultado} setDados={setDados} />
            <DadosCliente dados={dados} resultado={resultado} setDados={setDados} />
            <Variaveis
              dados={dados}
              integracoes={integracoes}
              resultado={resultado}
              setDados={setDados}
              setIntegracoes={setIntegracoes}
            />
            <Observacoes dados={dados} setDados={setDados} />
          </div>

          <div className="lg:col-span-4">
            <ResumoHonorario dados={dados} resultado={resultado} />
          </div>
        </div>
      </main>
    </div>
  )
}
