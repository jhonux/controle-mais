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
  ReferenceLine,
  Area,
  Dot, 
} from 'recharts';

export interface BalanceChartData {
  month: string;
  saldo: number;
}

interface BalanceChartProps {
  data: BalanceChartData[];
}

const CustomizedDot = (props: any) => {
  const { cx, cy, payload } = props;

  if (payload.saldo < 0) {
    return <Dot cx={cx} cy={cy} r={5} fill="#ef4444" stroke="#fff" strokeWidth={2} />;
  }


  return <Dot cx={cx} cy={cy} r={5} fill="#3B82F6" stroke="#fff" strokeWidth={2} />;
};


export default function BalanceChart({ data }: BalanceChartProps) {
  
  const gradientId = "colorSaldo";
  const dataMax = Math.max(...data.map(i => i.saldo));
  const dataMin = Math.min(...data.map(i => i.saldo));
  let offset = 0;
  if (dataMax > 0 && dataMin < 0) {
    offset = dataMax / (dataMax - dataMin);
  } else if (dataMax <= 0) {
    offset = 1;
  }


  const tooltipFormatter = (value: number) => {

    const color = value < 0 ? '#ef4444' : '#3B82F6'; 
    
 
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

    
    return <span style={{ color }}>{formattedValue}</span>;
  };

  const yAxisFormatter = (value: number) => 
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Evolução do Saldo Mensal</h3>
      <p className="text-gray-600 text-sm mb-4">
        Acompanhe a projeção do seu saldo para os próximos meses
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
       
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset={offset} stopColor="#22c55e" stopOpacity={0.4}/>
              <stop offset={offset} stopColor="#ef4444" stopOpacity={0.4}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} style={{ fontFamily: 'inherit' }} />
          <YAxis
            tickFormatter={yAxisFormatter}
            tick={{ fontSize: 12 }}
            style={{ fontFamily: 'inherit' }}
            width={80}
          />
          <Tooltip
            formatter={tooltipFormatter}
            contentStyle={{ borderRadius: '0.5rem', borderColor: '#e5e7eb' }}
            labelStyle={{ fontSize: 12, fontWeight: 'bold' }}
          />
          <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
          <Area type="monotone" dataKey="saldo" stroke="transparent" fill={`url(#${gradientId})`} />
          
          
          <Line 
            type="monotone" 
            dataKey="saldo" 
            stroke="#3B82F6" 
            strokeWidth={2} 
            activeDot={{ r: 6 }}
            dot={<CustomizedDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}