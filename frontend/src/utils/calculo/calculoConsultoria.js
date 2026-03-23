import { arredondar } from "./helpers"

export function calculoConsultoria(dados, valorBase) {
    if (dados.consultoria !== "sim") return 0

    const imposto = Number(dados.imposto)
    const Base = Number(valorBase)
    const consultoria = arredondar((Base * 0.15) / (1 - imposto))
    return consultoria
}
