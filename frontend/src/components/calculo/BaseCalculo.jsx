import { useEffect, useState } from "react"

import {
  clamp,
  formatCurrency,
  formatLocalizedNumber,
  parseIntegerInput,
  parseLocalizedNumber,
} from "../../utils/calculo/helpers"

const PERCENTUAL_MIN = 50
const PERCENTUAL_MAX = 110
const IMPOSTO_MIN = 5
const IMPOSTO_MAX = 20

export default function BaseCalculo({ dados, setDados, resultado }) {
  const salarioMinimo = Number(dados.salarioMinimo)
  const percentualAtual = clamp(
    Math.round(Number(dados.percentual || 0.9) * 100),
    PERCENTUAL_MIN,
    PERCENTUAL_MAX,
  )
  const impostoAtual = clamp(
    Math.round(Number(dados.imposto ?? 0.12) * 100),
    IMPOSTO_MIN,
    IMPOSTO_MAX,
  )

  const salarioPercentual = salarioMinimo * (percentualAtual / 100)

  const [percentualInput, setPercentualInput] = useState(String(percentualAtual))
  const [impostoInput, setImpostoInput] = useState(String(impostoAtual))

  // Mantem o input textual em sincronia com o valor valido aplicado no calculo.
  useEffect(() => {
    setPercentualInput(String(percentualAtual))
  }, [percentualAtual])

  // Mantem o input textual de imposto em sincronia com o valor valido aplicado.
  useEffect(() => {
    setImpostoInput(String(impostoAtual))
  }, [impostoAtual])

  // Valida e aplica o percentual digitado; em valor invalido, usa o minimo permitido.
  const validarPercentual = () => {
    const parsed = parseIntegerInput(percentualInput)
    const valorFinal =
      parsed !== null && parsed >= PERCENTUAL_MIN && parsed <= PERCENTUAL_MAX
        ? parsed
        : PERCENTUAL_MIN

    setDados({ ...dados, percentual: valorFinal / 100 })
    setPercentualInput(String(valorFinal))
  }

  // Valida e aplica o imposto digitado; em valor invalido, usa o minimo permitido.
  const validarImposto = () => {
    const parsed = parseIntegerInput(impostoInput)
    const valorFinal = parsed !== null && parsed >= IMPOSTO_MIN && parsed <= IMPOSTO_MAX ? parsed : IMPOSTO_MIN

    setDados({ ...dados, imposto: valorFinal / 100 })
    setImpostoInput(String(valorFinal))
  }

  // Permite confirmar pelo Enter, aplicando o valor ao calculo e sincronizando o slider.
  const handlePercentualKeyDown = (event) => {
    if (event.key !== "Enter") return
    event.preventDefault()
    validarPercentual()
  }

  // Permite confirmar imposto pelo Enter para aplicar imediatamente no calculo.
  const handleImpostoKeyDown = (event) => {
    if (event.key !== "Enter") return
    event.preventDefault()
    validarImposto()
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-slate-900">Base de Calculo</h2>
      </div>

      <div className="mb-6 rounded-lg bg-slate-50 p-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">Salario minimo vigente</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">R$</span>
          <input
            className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
            inputMode="decimal"
            placeholder="Ex. 1.500"
            type="text"
            value={formatLocalizedNumber(dados.salarioMinimo)}
            onChange={(e) =>
              setDados({ ...dados, salarioMinimo: parseLocalizedNumber(e.target.value) })
            }
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Base parcial: {formatCurrency(salarioMinimo)} x {percentualAtual}% = {formatCurrency(salarioPercentual)}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <p className="font-medium text-slate-700">Percentual do salario minimo</p>
              <span className="font-semibold text-blue-700">{percentualAtual}%</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
                max={PERCENTUAL_MAX}
                min={PERCENTUAL_MIN}
                step="5"
                type="range"
                value={percentualAtual}
                onChange={(e) => {
                  const valor = Number(e.target.value || PERCENTUAL_MIN)
                  setDados({ ...dados, percentual: valor / 100 })
                  setPercentualInput(String(valor))
                }}
              />
              <div className="relative">
                <input
                  className="w-20 rounded-md border border-slate-300 px-2 py-1 pr-6 text-right text-sm placeholder:text-slate-400"
                  inputMode="numeric"
                  placeholder="Ex. 90"
                  type="text"
                  value={percentualInput}
                  onBlur={validarPercentual}
                  onChange={(e) => setPercentualInput(e.target.value.replace(/[^\d]/g, ""))}
                  onKeyDown={handlePercentualKeyDown}
                />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                  %
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {formatCurrency(salarioMinimo)} x {percentualAtual}% = {formatCurrency(salarioPercentual)}
            </p>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <p className="font-medium text-slate-700">Imposto aplicado no valor base</p>
              <span className="font-semibold text-blue-700">{impostoAtual}%</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
                max={IMPOSTO_MAX}
                min={IMPOSTO_MIN}
                step="1"
                type="range"
                value={impostoAtual}
                onChange={(e) => {
                  const valor = Number(e.target.value || IMPOSTO_MIN)
                  setDados({ ...dados, imposto: valor / 100 })
                  setImpostoInput(String(valor))
                }}
              />
              <div className="relative">
                <input
                  className="w-20 rounded-md border border-slate-300 px-2 py-1 pr-6 text-right text-sm placeholder:text-slate-400"
                  inputMode="numeric"
                  placeholder="Ex. 12"
                  type="text"
                  value={impostoInput}
                  onBlur={validarImposto}
                  onChange={(e) => setImpostoInput(e.target.value.replace(/[^\d]/g, ""))}
                  onKeyDown={handleImpostoKeyDown}
                />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                  %
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Valor base: {formatCurrency(salarioPercentual)} / (1 - {impostoAtual}%) = {formatCurrency(resultado?.valorBase)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Piso minimo personalizado</label>
          <div className="relative mt-2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">R$</span>
            <input
              className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
              inputMode="decimal"
              placeholder="Ex. 1.000"
              type="text"
              value={formatLocalizedNumber(dados.pisoPersonalizado)}
              onChange={(e) =>
                setDados({ ...dados, pisoPersonalizado: parseLocalizedNumber(e.target.value) })
              }
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Se o piso for maior que a soma, o total final passa a ser {formatCurrency(dados.pisoPersonalizado)}.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
        Valor base calculado: <strong>{formatCurrency(resultado?.valorBase)}</strong>
      </div>
    </section>
  )
}
