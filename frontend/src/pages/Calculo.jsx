import { useState } from "react"
import { Link } from "react-router-dom"

import React from "react"

import BaseCalculo from "../components/calculo/BaseCalculo"
import DadosCliente from "../components/calculo/DadosCliente"
import ResumoHonorario from "../components/calculo/ResumoHonorario"
import Variaveis from "../components/calculo/Variaveis"
import { calcularHonorario } from "../utils/calculo/calcularHonorario"

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
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
          <Link className="flex items-center gap-3" to="/dashboard">
            <div className="size-6 text-blue-600">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold tracking-tight">Clara Honorários</h2>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link className="text-blue-600" to="/dashboard">
              Dashboard
            </Link>
            <Link className="text-slate-600 transition-colors hover:text-slate-900" to="/historico">
              Histórico
            </Link>
          </nav>
        </div>
      </header>

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
          </div>

          <div className="lg:col-span-4">
            <ResumoHonorario dados={dados} resultado={resultado} />
          </div>
        </div>
      </main>
    </div>
  )
}
