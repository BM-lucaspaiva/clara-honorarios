import { arredondar } from "./helpers"

/**
 * Calcula o acréscimo por faturamento.
 * Até 15.000 não há acréscimo; acima disso aplica 0,2%.
 */
export function calcularFaturamento(faturamento){

let acresFaturamento = 0    
const valor = Number(faturamento || 0)

if(valor <= 15000) return acresFaturamento
if(valor > 15000) {
     return arredondar(acresFaturamento = valor *(0.2/100))
}

}
