import StatsPanel from "./StatsPanel"
import VolumeByCompany from "./VolumeByCompany"

export default function HistorySidebar() {
  return (
    <div className="flex flex-col gap-6">
      <StatsPanel />
      <VolumeByCompany />
    </div>
  )
}