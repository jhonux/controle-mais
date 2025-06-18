import SummaryCard from "@/components/dash/SumaryCard";
import BalanceChart from "@/components/dash/BalanceChart";
import ExpensesTable from "@/components/dash/ExpensesTable";
import CategoryExpenses from "@/components/dash/CategoryExpenses";
import Link from "next/link";
import { Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react";

// Interfaces para tipagem dos dados
interface Transaction {
  id_transacao: number;
  descricao: string;
  valor?: number;
  data?: string;
  tipo_transacao: string;
  categoria: string;
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
  saldo_mensal?: number;
}

export const metadata = {
  title: 'Controle Financeiro',
  description: 'Dashboard financeiro para gerenciar suas finanças',
};

export default async function DashPage() {
  const userId = 1;

  // URLs para os componentes de tabela e gráficos
  const top5ExpensesUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/view-gastos-mes-atual-top-5?P_ID_USUARIO=${userId}`;
  const categoryExpensesUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/view-gastos-ano-categoria?P_ID_USUARIO=${userId}`;
  const monthlyBalanceUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/view-projecao-financeira-12-meses?P_ID_USUARIO=${userId}`;
  const recentTransactionsUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/view-ultimas-transacoes-top-5?P_ID_USUARIO=${userId}`;

  // URLs dedicadas para os cards de resumo
  const summaryReceitasUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/dashboard/receitas?P_ID_USUARIO=${userId}`;
  const summaryGastosUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/dashboard/gastos?P_ID_USUARIO=${userId}`;
  const summarySaldoUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/dashboard/saldo?P_ID_USUARIO=${userId}`;

  // Buscando todos os dados em paralelo para máxima performance
  const [
    summaryReceitasRes,
    summaryGastosRes,
    summarySaldoRes,
    top5ExpensesRes,
    categoryExpensesRes,
    monthlyBalanceRes,
    recentTransactionsRes
  ] = await Promise.all([
    fetch(summaryReceitasUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(summaryGastosUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(summarySaldoUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(top5ExpensesUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(categoryExpensesUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(monthlyBalanceUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(recentTransactionsUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
  ]);

  // Verificações de erro para cada resposta da API
  if (!summaryReceitasRes.ok) throw new Error("Erro ao carregar receitas do mês");
  if (!summaryGastosRes.ok) throw new Error("Erro ao carregar gastos do mês");
  if (!summarySaldoRes.ok) throw new Error("Erro ao carregar saldo atual");
  if (!top5ExpensesRes.ok) throw new Error("Erro ao carregar top 5 gastos do mês");
  if (!categoryExpensesRes.ok) throw new Error("Erro ao carregar gastos por categoria");
  if (!monthlyBalanceRes.ok) throw new Error("Erro ao carregar projeção financeira");
  if (!recentTransactionsRes.ok) throw new Error("Erro ao carregar últimas transações");

  // Extraindo o JSON de todas as respostas
  const [
    summaryReceitasRaw,
    summaryGastosRaw,
    summarySaldoRaw,
    top5ExpensesRaw,
    categoryExpensesRaw,
    monthlyBalanceRaw,
    recentTransactionsRaw
  ] = await Promise.all([
    summaryReceitasRes.json(),
    summaryGastosRes.json(),
    summarySaldoRes.json(),
    top5ExpensesRes.json(),
    categoryExpensesRes.json(),
    monthlyBalanceRes.json(),
    recentTransactionsRes.json()
  ]);

  // Extração segura dos dados, lidando com diferentes formatos de resposta da API
  const sumReceitas = summaryReceitasRaw?.items?.[0]?.total_receitas || 0;
  const sumDespesas = summaryGastosRaw?.items?.[0]?.total_gastos || 0;
  const saldoAtual = summarySaldoRaw?.items?.[0]?.saldo || 0;

  const top5ExpensesData: TopExpense[] = top5ExpensesRaw?.items || (Array.isArray(top5ExpensesRaw) ? top5ExpensesRaw : []);
  const categoryExpensesData: CategoryExpense[] = categoryExpensesRaw?.items || (Array.isArray(categoryExpensesRaw) ? categoryExpensesRaw : []);
  const monthlyBalanceData: MonthlyBalance[] = monthlyBalanceRaw?.items || (Array.isArray(monthlyBalanceRaw) ? monthlyBalanceRaw : []);
  const recentTransactionsData: Transaction[] = recentTransactionsRaw?.items || (Array.isArray(recentTransactionsRaw) ? recentTransactionsRaw : []);


  const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', signDisplay: 'auto' });
  const currencyFormatterWithPlusSign = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', signDisplay: 'exceptZero' });


  const recent = recentTransactionsData.map((t) => ({
    category: t.categoria,
    value: currencyFormatterWithPlusSign.format(t.valor ?? 0),
    date: (t.data ?? '').substring(0, 10).split("-").reverse().join("/"),
    description: t.descricao,
  }));

  const monthlyExpenses = top5ExpensesData.map(t => ({
    category: t.categoria,
    value: currencyFormatter.format(t.valor ?? 0),
    date: (t.data ?? '').substring(0, 10).split("-").reverse().join("/"),
    description: t.descricao,
  }));

  const catExpenses = categoryExpensesData.map(c => ({
    category: c.categoria,
    value: currencyFormatter.format(Math.abs(c.total_ano ?? 0)),
  }));

  const lineChartData = monthlyBalanceData.map(item => ({
    month: item.mes_ano.trim().split(/\s+/)[0].substring(0, 3),
    saldo: item.saldo_mensal ?? 0,
  }));

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCard title="Receitas do Mês" value={currencyFormatter.format(sumReceitas)} trend={currencyFormatterWithPlusSign.format(saldoAtual)} icon={<TrendingUp size={24} color="#039e00" />} />
        <SummaryCard title="Gastos do Mês" value={currencyFormatter.format(sumDespesas)} trend={currencyFormatter.format(-saldoAtual)} icon={<TrendingDown size={24} color="#d90202" />} />
        <SummaryCard title="Saldo Atual" value={currencyFormatter.format(saldoAtual)} icon={<Wallet size={24} color="#004cff" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart data={lineChartData} />
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