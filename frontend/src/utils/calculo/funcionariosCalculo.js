import { arredondar } from "./helpers"

/**
 * Calcula o componente de honorário por faixa de funcionários.
 * O valor-base da faixa é 4% do salário mínimo.
 */
export function calcularFuncionarios(dados) {

const salarioMinimo = Number(dados.salarioMinimo || 0)
const funcionarios = Number(dados.funcionarios || 0)

const funcionariosBase = arredondar(salarioMinimo * 0.04)
let valFuncionarios = 0
let porcFuncionarios = 0

if(funcionarios > 0 && funcionarios <= 5) porcFuncionarios = funcionariosBase 
if(funcionarios <= 20 && funcionarios > 5)  porcFuncionarios = arredondar(funcionariosBase * 0.93)
if(funcionarios <= 50 && funcionarios > 20) porcFuncionarios = arredondar(funcionariosBase * 0.85)
if(funcionarios <= 100 && funcionarios > 50) porcFuncionarios = arredondar(funcionariosBase * 0.8)
if(funcionarios <= 250 && funcionarios > 100) porcFuncionarios = arredondar(funcionariosBase * 0.75)
if(funcionarios <= 300 && funcionarios > 250) porcFuncionarios = arredondar(funcionariosBase * 0.7)
if(funcionarios > 300) porcFuncionarios = arredondar(funcionariosBase * 0.65)

valFuncionarios = arredondar(funcionarios * porcFuncionarios)

return valFuncionarios

}
