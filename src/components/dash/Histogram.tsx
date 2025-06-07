'use client'; // Necessário porque o Recharts requer renderização no lado do cliente

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function Histogram() {
  // Dados fictícios para o histograma
  const data = [
    { month: 'Jan', gastos: 2500 },
    { month: 'Fev', gastos: 2000 },
    { month: 'Mar', gastos: 3000 },
    { month: 'Abr', gastos: 3500 },
    { month: 'Mai', gastos: 4000 },
    { month: 'Jun', gastos: 4500 },
    { month: 'Jul', gastos: 8000 },
    { month: 'Ago', gastos: 3000 },
    { month: 'Set', gastos: 2500 },
    { month: 'Out', gastos: 2000 },
    { month: 'Nov', gastos: 1500 },
    { month: 'Dez', gastos: 1000 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Gastos dos Últimos 12 Meses</h3>
      <p className="text-gray-600 text-sm mb-4">Acompanhe a evolução dos seus gastos mensais</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }} 
            style={{ fontFamily: 'inherit' }}
          />
          <YAxis
            domain={[0, 10000]}
            tickFormatter={(value) => `R$ ${value}`}
            tick={{ fontSize: 12 }} 
            style={{ fontFamily: 'inherit' }}
          />
          <Tooltip
            formatter={(value: number) => `R$ ${value}`}
            itemStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="gastos" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}