// Arquivo: SummaryCard.tsx (Versão Melhorada)
import React from 'react';

// 1. A interface agora aceita um 'icon' que pode ser qualquer componente React.
interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode; // Propriedade para o ícone
  trend?: string;
}

export default function SummaryCard({ title, value, icon, trend }: SummaryCardProps) {
  return (
    <div className="flex flex-col h-full bg-white p-4 rounded-lg shadow-md transition-transform hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
        <div className="text-gray-400" aria-hidden="true">
          {icon}
        </div>
      </div>

      <div className="mt-auto">
        <p className="text-2xl font-bold mb-4">{value}</p>
        {/* {trend && (
          <p className={`text-sm ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </p>
        )} */}
      </div>
    </div>
  );
}