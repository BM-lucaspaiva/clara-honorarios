import { arredondar } from "./helpers"

/**
 * Calcula o componente de honorário por faixa de funcionários.
 * O valor-base da faixa é 4% do salário mínimo.
 */
export function calcularFuncionarios(dados){

const salarioMinimo = Number(dados.salarioMinimo || 0)
const funcionarios = Number(dados.funcionarios || 0)
const socios = Number(dados.socios || 0)

const funcionariosBase = arredondar(salarioMinimo * 0.04)
let valFuncionarios = 0

if(funcionarios > 0 && funcionarios <= 5) funcionariosBase
if(funcionarios <= 20 && funcionarios > 5)  valFuncionarios = arredondar(funcionariosBase * 0.93)
if(funcionarios <= 50 && funcionarios > 20) valFuncionarios = arredondar(funcionariosBase * 0.85)
if(funcionarios <= 100 && funcionarios > 50) valFuncionarios = arredondar(funcionariosBase * 0.8)
if(funcionarios <= 250 && funcionarios > 100) valFuncionarios = arredondar(funcionariosBase * 0.75)
if(funcionarios <= 300 && funcionarios > 250) valFuncionarios = arredondar(funcionariosBase * 0.7)
if(funcionarios > 300) valFuncionarios = arredondar(funcionariosBase * 0.65)

const funcionariosValor = arredondar(valFuncionarios * funcionarios + (socios * 49))

return funcionariosValor

}
