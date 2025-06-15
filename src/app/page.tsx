import SummaryCard from "@/components/dash/SumaryCard";
import Histogram from "@/components/dash/Histogram";
import ExpensesTable from "@/components/dash/ExpensesTable";
import CategoryExpenses from "@/components/dash/CategoryExpenses";
import Link from "next/link";
import { Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react";

// Suas interfaces continuam as mesmas
interface Transaction {
  id_transacao:     number;
  descricao:        string;
  valor?:           number;
  data?:            string;
  tipo_transacao:   string;
  categoria:        string;
  forma_pagamento:  string;
}
// ... resto das interfaces

export const metadata = {
  title: 'Controle Financeiro',
  description: 'Dashboard financeiro para gerenciar suas finanças',
};

export default async function DashPage() {
  const userId = 1;
  // As URLs e a busca de dados continuam iguais
  const transactionsUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/transacao?P_ID_USUARIO=${userId}`;
  const top5ExpensesUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/view-gastos-mes-atual-top-5?P_ID_USUARIO=${userId}`;
  const categoryExpensesUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/view-gastos-ano-categoria?P_ID_USUARIO=${userId}`;
  const monthlyBalanceUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/view-projecao-financeira-12-meses?P_ID_USUARIO=${userId}`;
  const recentTransactionsUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/view-ultimas-transacoes-top-5?P_ID_USUARIO=${userId}`;

  const [
    transactionsRes, 
    top5ExpensesRes, 
    categoryExpensesRes,
    monthlyBalanceRes,
    recentTransactionsRes
  ] = await Promise.all([
    fetch(transactionsUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(top5ExpensesUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(categoryExpensesUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(monthlyBalanceUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
    fetch(recentTransactionsUrl, { cache: "no-store", headers: { Accept: "application/json" } }),
  ]);

  if (!transactionsRes.ok) throw new Error("Erro ao carregar transações");
  if (!top5ExpensesRes.ok) throw new Error("Erro ao carregar top 5 gastos do mês");
  if (!categoryExpensesRes.ok) throw new Error("Erro ao carregar gastos por categoria");
  if (!monthlyBalanceRes.ok) throw new Error("Erro ao carregar projeção financeira");
  if (!recentTransactionsRes.ok) throw new Error("Erro ao carregar últimas transações");

  const [
    transactionsRaw, 
    top5ExpensesRaw, 
    categoryExpensesRaw,
    monthlyBalanceRaw,
    recentTransactionsRaw
  ] = await Promise.all([
    transactionsRes.json(),
    top5ExpensesRes.json(),
    categoryExpensesRes.json(),
    monthlyBalanceRes.json(),
    recentTransactionsRes.json()
  ]);

  // A extração dos dados continua igual
  const transactions: Transaction[] = transactionsRaw?.items || (Array.isArray(transactionsRaw) ? transactionsRaw : []);
  const top5ExpensesData: TopExpense[] = top5ExpensesRaw?.items || (Array.isArray(top5ExpensesRaw) ? top5ExpensesRaw : []);
  const categoryExpensesData: CategoryExpense[] = categoryExpensesRaw?.items || (Array.isArray(categoryExpensesRaw) ? categoryExpensesRaw : []);
  const monthlyBalanceData: MonthlyBalance[] = monthlyBalanceRaw?.items || (Array.isArray(monthlyBalanceRaw) ? monthlyBalanceRaw : []);
  const recentTransactionsData: Transaction[] = recentTransactionsRaw?.items || (Array.isArray(recentTransactionsRaw) ? recentTransactionsRaw : []);

  // <<< MUDANÇA PRINCIPAL: Criamos um formatador de moeda único
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    signDisplay: 'auto', // 'auto' é o padrão, não mostra '+' para positivos
  });
  
  // Formatador opcional se você AINDA QUISER o sinal de '+'
  const currencyFormatterWithPlusSign = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    signDisplay: 'exceptZero', 
  });

  // <<< MUDANÇA AQUI: Simplificamos o mapeamento
  const recent = recentTransactionsData.map((t) => ({
    category:    t.categoria,
    value:       currencyFormatterWithPlusSign.format(t.valor ?? 0), // Usamos o formatador
    date:        (t.data ?? '').substring(0, 10).split("-").reverse().join("/"),
    description: t.descricao,
  }));

  // <<< MUDANÇA AQUI: Simplificamos o mapeamento
  const monthlyExpenses = top5ExpensesData.map(t => ({
    category:    t.categoria,
    value:       currencyFormatter.format(t.valor ?? 0), // Usamos o formatador
    date:        (t.data ?? '').substring(0, 10).split("-").reverse().join("/"),
    description: t.descricao,
  }));

  // <<< MUDANÇA AQUI: Simplificamos o mapeamento
  const catExpenses = categoryExpensesData.map(c => ({
    category: c.categoria,
    value: currencyFormatter.format(c.total_ano ?? 0), // Usamos o formatador
  }));

  const histogramData = monthlyBalanceData.map(item => ({
    month: item.mes_ano.trim().split(/\s+/)[0].substring(0, 3),
    gastos: Math.abs(item.saldo_mensal ?? 0),
  }));

  // A lógica de cálculo do resumo continua a mesma
  const now = new Date();
  const curMon = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  let sumReceitas = 0, sumDespesas = 0;
  transactions.forEach((t) => {
    if (!t.data?.startsWith(curMon)) return;
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
        <Link href="/nova-transacao">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hidden md:block">
            Nova Transação
          </button>
        </Link>
      </div>

      {/* <<< MUDANÇA AQUI: Usamos o formatador nos cards para consistência */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCard title="Receitas do Mês" value={currencyFormatter.format(sumReceitas)} trend={currencyFormatterWithPlusSign.format(sumReceitas - sumDespesas)} icon={<TrendingUp size={24} color="#039e00" />} />
        <SummaryCard title="Gastos do Mês" value={currencyFormatter.format(Math.abs(sumDespesas))} trend={currencyFormatter.format(sumDespesas - sumReceitas)} icon={<TrendingDown size={24} color="#d90202" />} />
        <SummaryCard title="Saldo Atual" value={currencyFormatter.format(saldoAtual)} icon={<Wallet size={24} color="#004cff" />} />
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