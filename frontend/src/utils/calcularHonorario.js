export function calcularHonorario(dados = {}){

const salarioMinimo = Number(dados.salarioMinimo || 0)
const percentual = Number(dados.percentual || 0)
const faturamento = Number(dados.faturamento || 0)
const funcionarios = Number(dados.funcionarios || 0)
const piso = Number(dados.pisoPersonalizado || 0)


// porcentagem selecionada
const salarioPercentual = salarioMinimo * dados.percentual

// VALOR BASE
const valorBase = Math.ceil(
  salarioPercentual / (1 - 0.12) || 0 
)

// ---------------- REGIME ----------------

let regimeValor = 0

const regimeMap = {
 "Simples Nacional": 0.15,
 "Lucro Presumido": 0.20,
 "Isenta/Imune": 0.18,
 "Lucro Real": 0.80,
 "PF/Livro Caixa": 0.10
}

if(dados.regime){
 regimeValor = Math.ceil(valorBase * regimeMap[dados.regime])
}

// ---------------- SEGMENTO ----------------

let segmentoValor = 0

const segmentoMap = {
 "Prestação de Serviços":0.15,
 "Comércio":0.20,
 "Indústria":0.35,
 "Construção Civil":0.28,
 "Holding":0.20
}

if(dados.segmento){
 segmentoValor = Math.ceil(valorBase * segmentoMap[dados.segmento])
}

// ---------------- FUNCIONÁRIOS ----------------

let funcionariosValor = 0

const funcionariosBase = Math.ceil(salarioMinimo * 0.04)

if(funcionarios > 0 && funcionarios <= 5){
 funcionariosValor = funcionariosBase
}

else if(funcionarios <= 20 && funcionarios > 5){
 funcionariosValor = Math.ceil(funcionariosBase * 0.93)
}

else if(funcionarios <= 50 && funcionarios > 20){
 funcionariosValor = Math.ceil(funcionariosBase * 0.85)
}

else if(funcionarios <= 100 && funcionarios > 50){
 funcionariosValor = Math.ceil(funcionariosBase * 0.8)
}

else if(funcionarios <= 250 && funcionarios > 100){
 funcionariosValor = Math.ceil(funcionariosBase * 0.75)
}

else if(funcionarios <= 300 && funcionarios > 250){
 funcionariosValor = Math.ceil(funcionariosBase * 0.7)
}

if(funcionarios > 300){
 funcionariosValor = Math.ceil(funcionariosBase * 0.65)
}

else{
 funcionariosValor = 0
}


// ---------------- FATURAMENTO ----------------

let acrescFaturamento = 0

if(faturamento > 15000){
 acrescFaturamento = Math.ceil(
  faturamento * (0.2 / 100)
 )
}


// ---------------- BALANCETE ----------------

const balanceteMap = {
 "Semestral":0.03,
 "Trimestral":0.05,
 "Bimestral":0.08,
 "Mensal":0.15
}

let balanceteValor = 0

if(dados.balancete){
 balanceteValor = Math.ceil(
  salarioMinimo * balanceteMap[dados.balancete]
 )
}


// ---------------- REUNIÃO ----------------

const reuniaoMap = {
 "Semestral":0.03,
 "Trimestral":0.05,
 "Bimestral":0.08,
 "Mensal":0.15
}

let reuniaoValor = 0

if(dados.reuniao){
 reuniaoValor = Math.ceil(
  salarioMinimo * reuniaoMap[dados.reuniao]
 )
}


// ---------------- SOMA FINAL ----------------

const honorarioTotal =
 regimeValor +
 segmentoValor +
 funcionariosValor +
 acrescFaturamento +
 balanceteValor +
 reuniaoValor +
 piso


return {

valorBase: valorBase || 0,
regimeValor: regimeValor || 0,
segmentoValor: segmentoValor || 0,
funcionariosValor: funcionariosValor || 0,
acrescFaturamento: acrescFaturamento || 0,
piso: piso || 0,
honorarioTotal: honorarioTotal || 0,
regime: dados.regime || "",
segmento: dados.segmento || "",
faturamento: dados.faturamento || 0,
}

}