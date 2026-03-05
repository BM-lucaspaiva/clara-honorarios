export default function Variaveis({dados,setDados}){

return(

<div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-xl font-semibold mb-4">
        Variáveis
    </h2>

    <select
        className="border p-2 w-full mb-3"
        onChange={(e)=>setDados({...dados, balancete:e.target.value})}
    >

        <option>Balancete</option>
        <option>Semestral</option>
        <option>Trimestral</option>
        <option>Bimestral</option>
        <option>Mensal</option>

    </select>


    <select
        className="border p-2 w-full mb-4"
        onChange={(e)=>setDados({...dados, reuniao:e.target.value})}
    >

        <option>Reunião</option>
        <option>Semestral</option>
        <option>Trimestral</option>
        <option>Bimestral</option>
        <option>Mensal</option>

    </select>


    <div className="grid grid-cols-2 gap-3">

        <label><input type="checkbox"/> Nibo (Docs + CC)</label>
        <label><input type="checkbox"/> Nibo (GF Plus - 173)</label>
        <label><input type="checkbox"/> Omie BPO - Simples</label>
        <label><input type="checkbox"/> Omie BPO - Presumido</label>
        <label><input type="checkbox"/> ContaAzul</label>
        <label><input type="checkbox"/> Nucont</label>
        <label><input type="checkbox"/> Braga Online</label>
        <label><input type="checkbox"/> Centro de Custos</label>
        <label><input type="checkbox"/> CRF Básico</label>
        <label><input type="checkbox"/> CRF Completo</label>

    </div>

</div>

)
}