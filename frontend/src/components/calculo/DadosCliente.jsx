export default function DadosCliente({dados,setDados}){

return(

<div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-xl font-semibold mb-4">
    Dados do Cliente
    </h2>

    <select
        className="border p-2 w-full mb-3"
        onChange={(e)=>setDados({...dados, regime:e.target.value})}
    >

        <option>Selecione o regime</option>
        <option>Simples Nacional</option>
        <option>Lucro Presumido</option>
        <option>Lucro Real</option>
        <option>Isento/Imune</option>
        <option>PF/Livro Caixa</option>

    </select>


    <select
        className="border p-2 w-full mb-3"
        onChange={(e)=>setDados({...dados, segmento:e.target.value})}
    >

        <option>Segmento</option>
        <option>Prestação de Serviços</option>
        <option>Comércio</option>
        <option>Indústria</option>
        <option>Construção Civil</option>
        <option>Holding</option>

    </select>


    <input
        className="border p-2 w-full mb-3"
        placeholder="Faturamento"
        type="number"
        onChange={(e)=>setDados({...dados, faturamento:e.target.value})}
    />

    <div className="grid grid-cols-2 gap-4">

        <input
        className="border p-2"
        placeholder="Funcionários"
        type="number"
        onChange={(e)=>setDados({...dados, funcionarios:e.target.value})}
        />

        <input
        className="border p-2"
        placeholder="Filiais"
        type="number"
        onChange={(e)=>setDados({...dados, filiais:e.target.value})}
        />

    </div>

</div>

)
}