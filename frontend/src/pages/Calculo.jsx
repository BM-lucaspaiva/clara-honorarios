import { useState } from "react"
import { calcularHonorario} from "../utils/calcularHonorario"

import BaseCalculo from "../components/calculo/BaseCalculo"
import DadosCliente from "../components/calculo/DadosCliente"
import Variaveis from "../components/calculo/Variaveis"
import ResumoHonorario from "../components/calculo/ResumoHonorario"

export default function Calculo() {

const [dados, setDados] = useState({

  salarioMinimo: 1621,
  percentual: 0.0,
  pisoPersonalizado: 0,

  regime: "",
  segmento: "",
  
  faturamento: 0,
  funcionarios: 0,
  filiais: 0,

  balancete: "",
  reuniao: "",

  variaveis: {
    niboDocs:false,
    niboGF:false,
    omieSimples:false,
    omiePresumido:false,
    contaAzul:false,
    nucont:false,
    braga:false,
    centroCustos:false,
    crfBasico:false,
    crfCompleto:false
}

})

const resultado = calcularHonorario(dados)

return (

    <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
        Cálculo de Honorários
        </h1>
        <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">

                <BaseCalculo dados={dados} setDados={setDados} resultado ={resultado} />

                <DadosCliente dados={dados} setDados={setDados} resultado ={resultado}/>

                <Variaveis dados={dados} setDados={setDados} resultado ={resultado}/>

                <button className="bg-blue-600 text-white mt-6 w-full py-2 rounded">
                    Gerar Relatório
                </button>

            </div>
        <ResumoHonorario dados={dados} resultado={resultado}/>
        </div>
    </div>
)

}