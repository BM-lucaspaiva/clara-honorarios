import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/historico/SearchBar";
import HistoryList from "../components/historico/HistoryList";
import StatsPanel from "../components/historico/StatsPanel";
import QuickTipCard from "../components/historico/QuickTipCard";
import { mockHistory } from "../data/mockHistory";
import { filterHistoryItems } from "../utils/historico/historico";

export default function Historico() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockHistory);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    return filterHistoryItems(items, search);
  }, [items, search]);

  function handleItemClick(item) {
    console.log("Abrir detalhe do cálculo:", item);
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb]">
      <div className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section>
            <header className="mb-8">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900">
                Histórico de Cálculos
              </h1>
            </header>

            <div className="mb-6">
              <SearchBar value={search} onChange={setSearch} />
            </div>

            <HistoryList
              items={filteredItems}
              loading={loading}
              onItemClick={handleItemClick}
            />

            {!loading && filteredItems.length > 0 && (
              <div className="mt-10 flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-3 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-700" />
                <p className="text-2xl text-gray-700">Role para carregar mais</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-gray-400">
                  Mostrando {filteredItems.length} de {items.length} resultados
                </p>
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <StatsPanel />
            <QuickTipCard />
          </aside>
        </div>
      </div>
    </main>
  );
}