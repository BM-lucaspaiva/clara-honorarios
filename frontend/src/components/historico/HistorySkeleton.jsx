export default function HistorySkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-28 animate-pulse rounded-lg border border-slate-200 bg-white shadow-sm"
        />
      ))}
    </div>
  )
}