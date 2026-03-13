import { arredondar } from "./helpers"

// Multiplicadores por frequência para balancete e reunião.
const freqMap = {

"Semestral":0.03,
"Trimestral":0.05,
"Bimestral":0.08,
"Mensal":0.15

}

/**
 * Calcula o acréscimo de balancete conforme frequência escolhida.
 */
export function calcularBalancete(salarioMinimo, balancete){

if(!balancete) return 0

return arredondar(
salarioMinimo * freqMap[balancete]
)

}

/**
 * Calcula o acréscimo de reunião conforme frequência escolhida.
 */
export function calcularReuniao(salarioMinimo, reuniao){

if(!reuniao) return 0

return arredondar(
salarioMinimo * freqMap[reuniao]
)

}
