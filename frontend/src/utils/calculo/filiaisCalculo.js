import { arredondar } from "./helpers";

/**
 * Calcula o acréscimo por filiais.
 * Cada filial adiciona 25% sobre a base.
 */
export function calcularFiliais(valorBase, filiais){

    if(!filiais && filiais == 0) return 0

    return arredondar(filiais * 0.25 * valorBase)
}
