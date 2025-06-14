import SummaryCard from "@/components/dash/SumaryCard";
import Histogram from "@/components/dash/Histogram";
import ExpensesTable from "@/components/dash/ExpensesTable";
import CategoryExpenses from "@/components/dash/CategoryExpenses";
import Link from "next/link";
import { Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react";


interface Transaction {
  id_transacao:    number;
  descricao:       string;
  valor?:          number;
  data?:           string;
  tipo_transacao:  string;
  categoria:       string;
  forma_pagamento: string;
}

interface TopExpense {
    categoria: string;
    valor?: number;
    data?: string;
    descricao: string;
}

interface CategoryExpense {
    categoria: string;
    total_ano?: number;
}

interface MonthlyBalance {
    mes_ano: string;
    saldo_mensal: number;
}

export const metadata = {
  title: 'Controle Financeiro',
  description: 'Dashboard financeiro para gerenciar suas finanças',
};

export default async function DashPage() {
  const userId = 1;
  const transactionsUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/transacao?P_ID_USUARIO=${userId}`;
  const top5ExpensesUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/view-gastos-mes-atual-top-5?P_ID_USUARIO=${userId}`;
  const categoryExpensesUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/view-gastos-ano-categoria?P_ID_USUARIO=${userId}`;
  const monthlyBalanceUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/view-projecao-financeira-12-meses?P_ID_USUARIO=${userId}`;

  const [
    transactionsRes, 
    top5ExpensesRes, 
    categoryExpensesRes,
    monthlyBalanceRes
  ] = await Promise.all([
    fetch(transactionsUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(top5ExpensesUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(categoryExpensesUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(monthlyBalanceUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
  ]);

  if (!transactionsRes.ok) throw new Error("Erro ao carregar transações");
  if (!top5ExpensesRes.ok) throw new Error("Erro ao carregar top 5 gastos do mês");
  if (!categoryExpensesRes.ok) throw new Error("Erro ao carregar gastos por categoria");
  if (!monthlyBalanceRes.ok) throw new Error("Erro ao carregar projeção financeira");

  const [
    transactionsRaw, 
    top5ExpensesRaw, 
    categoryExpensesRaw,
    monthlyBalanceRaw
  ] = await Promise.all([
    transactionsRes.json(),
    top5ExpensesRes.json(),
    categoryExpensesRes.json(),
    monthlyBalanceRes.json()
  ]);

  console.log("DADOS DA API DE GASTOS POR CATEGORIA:", categoryExpensesRaw);

  let transactions: Transaction[] = [];
  if (Array.isArray(transactionsRaw)) { transactions = transactionsRaw; } 
  else if (transactionsRaw?.items) { transactions = transactionsRaw.items; }

  let top5ExpensesData: TopExpense[] = [];
  if (Array.isArray(top5ExpensesRaw)) { top5ExpensesData = top5ExpensesRaw; }
  else if (top5ExpensesRaw?.items) { top5ExpensesData = top5ExpensesRaw.items; }
  
  let categoryExpensesData: CategoryExpense[] = [];
  if (Array.isArray(categoryExpensesRaw)) { categoryExpensesData = categoryExpensesRaw; }
  else if (categoryExpensesRaw?.items) { categoryExpensesData = categoryExpensesRaw.items; }

  let monthlyBalanceData: MonthlyBalance[] = [];
  if (Array.isArray(monthlyBalanceRaw)) { monthlyBalanceData = monthlyBalanceRaw; }
  else if (monthlyBalanceRaw?.items) { monthlyBalanceData = monthlyBalanceRaw.items; }
  
  const recent = transactions.slice(0, 5).map((t) => {
    const isDespesa = t.tipo_transacao.toLowerCase() === "saida";
    return {
      category:    t.categoria,
      value:       `${isDespesa ? "- " : "+ "}R$ ${((t.valor ?? 0)).toFixed(2)}`,
      date:        (t.data ?? '').substring(0, 10).split("-").reverse().join("/"),
      description: t.descricao,
    };
  });

  const monthlyExpenses = top5ExpensesData.map(t => {
    return {
        category:    t.categoria,
        value:       `- R$ ${((t.valor ?? 0)).toFixed(2)}`,
        date:        (t.data ?? '').substring(0, 10).split("-").reverse().join("/"),
        description: t.descricao,
    }
  });

  const catExpenses = categoryExpensesData.map(c => ({
    category: c.categoria,
    value: `R$ ${((c.total_ano ?? 0)).toFixed(2)}`,
  }));

  const histogramData = monthlyBalanceData.map(item => {
    const monthName = item.mes_ano.trim().split(/\s+/)[0];
    const expenseValue = Math.abs(item.saldo_mensal ?? 0); 
    return { 
      month: monthName.substring(0, 3),
      gastos: expenseValue 
    };
  });

  const now = new Date();
  const curMon = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  let sumReceitas = 0, sumDespesas = 0;
  transactions.forEach((t) => {
    if (!t.data.startsWith(curMon)) return;
    if (t.tipo_transacao.toLowerCase() === "entrada") {
      sumReceitas += (t.valor ?? 0);
    } else {
      sumDespesas += (t.valor ?? 0);
    }
  });

  const saldoAtual = sumReceitas - sumDespesas;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Visão geral das suas finanças</p>
        </div>
        <div>
          

        </div>
        <Link href="/nova-transacao">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hidden md:block">
            Nova Transação
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCard title="Receitas do Mês" value={`R$ ${sumReceitas.toFixed(2)}`} trend={`+ R$ ${(sumReceitas - sumDespesas).toFixed(2)}`} icon={<TrendingUp size={24} color="#039e00" />} />
        <SummaryCard title="Gastos do Mês" value={`R$ ${sumDespesas.toFixed(2)}`} trend={`- R$ ${(sumDespesas - sumReceitas).toFixed(2)}`} icon={<TrendingDown size={24} color="#d90202" />} />
        <SummaryCard title="Saldo Atual" value={`R$ ${saldoAtual.toFixed(2)}`} icon={<Wallet size={24} color="#004cff" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Histogram data={histogramData}/>
        <ExpensesTable title="Principais Gastos do Mês" data={monthlyExpenses} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CategoryExpenses data={catExpenses} />
        <ExpensesTable title="Últimas 5 Transações" data={recent} />
      </div>

      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <Link href="/nova-transacao">
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg">
            <Plus className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </div>
  );
}