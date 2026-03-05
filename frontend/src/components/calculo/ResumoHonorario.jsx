export default function ResumoHonorario({dados}){

return(

<div className="bg-blue-600 text-white rounded-xl p-6 h-fit">

    <h2 className="text-lg mb-4">
        Honorário Mensal Estimado
    </h2>

    <div className="text-4xl font-bold mb-6">
        R$ 0,00
    </div>

    <div className="text-sm space-y-2">

        <div>Regime: {dados.regime}</div>
        <div>Faturamento: {dados.faturamento}</div>
        <div>Funcionários: {dados.funcionarios}</div>
        <div>Filiais: {dados.filiais}</div>

    </div>

    <button className="bg-white text-blue-600 mt-6 w-full py-2 rounded">
        Gerar Relatório
    </button>

</div>

)
}