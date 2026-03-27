import EmptyState from "./EmptyState"
import HistoryCard from "./HistoryCard"
import HistorySkeleton from "./HistorySkeleton"

export default function HistoryList({ items, loading, onItemClick }) {
  if (loading) {
    return <HistorySkeleton />
  }

  if (!items.length) {
    return <EmptyState />
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <HistoryCard
          key={item.id}
          item={item}
          onClick={onItemClick}
        />
      ))}
    </div>
  )
}