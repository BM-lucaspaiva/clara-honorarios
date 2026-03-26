export default function HistorySkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-24 animate-pulse rounded-xl border border-gray-200 bg-white"
        />
      ))}
    </div>
  );
}