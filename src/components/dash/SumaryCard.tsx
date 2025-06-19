
import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

export default function SummaryCard({ title, value, icon }: SummaryCardProps) {
  const valueColor = value.startsWith('-') ? 'text-red-700' : 'text-green-700';

  return (
    <div className="flex flex-col h-full bg-white p-4 rounded-lg shadow-md transition-transform hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
        <div className="text-gray-400" aria-hidden="true">
          {icon}
        </div>
      </div>
      <div className="mt-auto">
        <p className={`text-2xl font-bold mb-4 ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
}