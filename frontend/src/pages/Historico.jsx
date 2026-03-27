import { useEffect, useMemo, useState } from "react"
import Header from "../components/general/Header"
import SearchBar from "../components/historico/SearchBar"
import HistoryList from "../components/historico/HistoryList"
import HistorySidebar from "../components/historico/HistorySidebar"
import { mockHistory } from "../data/mockHistory"
import { filterHistoryItems } from "../utils/historico/historico"

export default function Historico() {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockHistory)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const filteredItems = useMemo(() => {
    return filterHistoryItems(items, search)
  }, [items, search])

  function handleItemClick(item) {
    console.log("Abrir detalhe do cálculo:", item)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Histórico de Cálculos</h1>
          <p className="mt-2 text-slate-600">
            Consulte os cálculos realizados e acompanhe o valor médio das propostas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="flex flex-col gap-6 lg:col-span-8">
            <SearchBar value={search} onChange={setSearch} />

            <HistoryList
              items={filteredItems}
              loading={loading}
              onItemClick={handleItemClick}
            />
          </section>

          <div className="lg:col-span-4">
            <HistorySidebar />
          </div>
        </div>
      </main>
    </div>
  )
}