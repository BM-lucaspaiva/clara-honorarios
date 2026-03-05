export default function BaseCalculo({dados, setDados}) {

const salario = dados.salarioMinimo

return (

    <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
        Base de Cálculo
        </h2>

        <div className="mb-4">
        Salário mínimo: <strong>R$ {salario}</strong>
        </div>
        <div className="space-y-2">

            <label>
                <input type="radio"
                checked={dados.percentual === 0.7}
                onChange={()=>setDados({...dados, percentual:0.7})}
                />
                70%
            </label>

            <label>
                <input type="radio"
                checked={dados.percentual === 0.9}
                onChange={()=>setDados({...dados, percentual:0.9})}
                />
                90%
            </label>

            <label>
                <input type="radio"
                checked={dados.percentual === 1.1}
                onChange={()=>setDados({...dados, percentual:1.1})}
                />
                110%
            </label>

        </div>

        <input
            className="border p-2 mt-4 w-full"
            placeholder="Piso mínimo personalizado"
            type="number"
            onChange={(e)=>setDados({...dados, pisoPersonalizado:e.target.value})}
        />

    </div>
)
}