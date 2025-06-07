interface SummaryCardProps {
  title: string;
  value: string;
  trend?: string;
}

export default function SummaryCard({ title, value, trend }: SummaryCardProps) {
  return (
    <div className="grid grid-cols-1  bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      {trend && (
        <p className={`text-sm ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </p>
      )}
    </div>
  );
}