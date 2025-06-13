
'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export interface HistogramData {
  month: string;
  gastos: number;
}

interface HistogramProps {
  data: HistogramData[];
}

export default function Histogram({ data }: HistogramProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Gastos dos Últimos 12 Meses</h3>
      <p className="text-gray-600 text-sm mb-4">
        Acompanhe a evolução dos seus gastos mensais em {currentYear}
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            style={{ fontFamily: 'inherit' }}
          />
          <YAxis
            domain={[0, 'dataMax']}
            tickFormatter={(value) => `R$ ${value}`}
            tick={{ fontSize: 12 }}
            style={{ fontFamily: 'inherit' }}
          />
          <Tooltip
            formatter={(value: number) => `R$ ${value}`}
            itemStyle={{ fontSize: 12 }}
          />
          <Line type="monotone" dataKey="gastos" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}