'use client';

import SummaryCard from "@/components/dash/SumaryCard";
import Histogram from "@/components/dash/Histogram";
import ExpensesTable from "@/components/dash/ExpensesTable";
import CategoryExpenses from "@/components/dash/CategoryExpenses";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function DashPage() {

  const router = useRouter();
    const monthlyExpenses = [
        { category: 'Alimentação', value:'R$ 850,00', date: '15/12/2024', description: 'Supermercado' },
        { category: 'Transporte', value:'R$ 200,00', date: '10/12/2024', description: 'Combustível' },
        { category: 'Saúde', value:'R$ 300,00', date: '05/12/2024', description: 'Farmácia' },
        { category: 'Lazer', value:'R$ 150,00', date: '20/12/2024', description: 'Cinema' },
        { category: 'Educação', value:'R$ 400,00', date: '25/12/2024', description: 'Curso Online' },
    ];

    const recentTransactions = [
    { category: 'Alimentação', value: '- R$ 85,00', date: '15/12/2024', description: 'Jantar restaurante' },
    { category: 'Salário', value: '+ R$ 5.250,00', date: '14/12/2024', description: 'Salário dezembro' },
    { category: 'Transporte', value: '- R$ 45,00', date: '13/12/2024', description: 'Uber' },
    { category: 'Freelance', value: '+ R$ 800,00', date: '12/12/2024', description: 'Projeto web' },
    { category: 'Lazer', value: '- R$ 120,00', date: '11/12/2024', description: 'Cinema e pipoca' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Visão geral das suas finanças</p>
        </div>
        <Link href="/nova-transacao">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hidden md:block">
            Nova Transação
          </button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard title="Receitas do Mês" value="R$ 5.250,00" trend="+ R$ 250,00" />
        <SummaryCard title="Gastos do Mês" value="R$ 3.180,00" trend="- R$ 120,00" />
        <SummaryCard title="Saldo Atual" value="R$ 12.700,00" />
        <SummaryCard title="Meta do Mês" value="R$ 4.000,00" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Histogram />
          <ExpensesTable title="Principais Gastos do Mês" data={monthlyExpenses} />
        
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CategoryExpenses />
        <ExpensesTable title="Últimas 5 Transações" data={recentTransactions} />
      </div>
      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
          onClick={() => router.push('/nova-transacao')}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}