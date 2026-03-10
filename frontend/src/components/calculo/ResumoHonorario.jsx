export default function ResumoHonorario({dados, resultado}){

return(

<div className="bg-blue-600 text-white rounded-xl p-6 h-fit">

    <h2 className="text-lg mb-4">
        Honorário Mensal Estimado
    </h2>

    <div className="text-4xl font-bold mb-6">
        {(resultado?.honorarioTotal || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
    </div>

    <div className="text-sm space-y-2">

        <div>Regime: {dados.regime}</div>
        <div>Segmento: {dados.segmento}</div>
        <div>Faturamento: {dados.faturamento}</div>
        <div>Funcionários: {dados.funcionarios}</div>
        <div>Filiais: {dados.filiais}</div>
        <div>Balancete: {dados.balancete}</div>
        <div>Reunião: {dados.reuniao}</div>

    </div>
    
</div>

)
}