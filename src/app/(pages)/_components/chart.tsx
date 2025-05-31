'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', valor: 400 },
  { name: 'Fev', valor: 300 },
  { name: 'Mar', valor: 500 },
  { name: 'Abr', valor: 200 },
    { name: 'Mai', valor: 600 },
    { name: 'Jun', valor: 700 },
    { name: 'Jul', valor: 800 },
    { name: 'Ago', valor: 900 },
    { name: 'Set', valor: 100 },
    { name: 'Out', valor: 410 },
    { name: 'Nov', valor: 5200 },
    { name: 'Dez', valor: 1300 }
];

export default function Chart() {
  return (
    <div className="h-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="valor" fill="#14b8a6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
