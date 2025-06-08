import SummaryCard from "@/components/dash/SumaryCard";
import Histogram from "@/components/dash/Histogram";
import ExpensesTable from "@/components/dash/ExpensesTable";
import CategoryExpenses from "@/components/dash/CategoryExpenses";
import Link from "next/link";
import { Plus, TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";

interface Transaction {
  id_transacao:     number;
  descricao:        string;
  valor:            number;
  data:             string;
  tipo_transacao:   string;
  categoria:        string;
  forma_pagamento:  string;
}

export default async function DashPage() {
  const userId = 1;
  const url = `https://apex.oracle.com/pls/apex/controleplus/controle/transacao?P_ID_USUARIO=${userId}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao carregar transações");

  const raw = await res.json();
  let transactions: Transaction[];
  if (Array.isArray(raw)) {
    transactions = raw;
  } else if (raw && Array.isArray((raw as any).items)) {
    transactions = (raw as any).items;
  } else {
    console.error("Resposta inesperada do endpoint `/transacao`:", raw);
    throw new Error("Formato de transações inválido");
  }

  const recent = transactions.slice(0, 5).map((t) => {
    const isDespesa = t.tipo_transacao.toLowerCase() === "saida";
    return {
      category:    t.categoria,
      value:       `${isDespesa ? "- " : "+ "}R$ ${t.valor.toFixed(2)}`,
      date:        t.data.split("-").reverse().join("/"),
      description: t.descricao,
    };
  });

  const now = new Date();
  const curMon = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
  let sumReceitas = 0, sumDespesas = 0;
  transactions.forEach((t) => {
    if (!t.data.startsWith(curMon)) return;
    if (t.tipo_transacao.toLowerCase() === "entrada") {
      sumReceitas += t.valor;
    } else {
      sumDespesas += t.valor;
    }
  });

  const year = now.getFullYear();
  const byCat: Record<string, number> = {};
  transactions.forEach((t) => {
    if (!t.data.startsWith(String(year))) return;
    if (t.tipo_transacao.toLowerCase() === "saida") {
      byCat[t.categoria] = (byCat[t.categoria] || 0) + t.valor;
    }
  });
  const catExpenses = Object.entries(byCat).map(([category, value]) => ({
    category,
    value: `R$ ${value.toFixed(2)}`,
  }));

  const monthLabels = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  const last12 = Array.from({ length: 12 }).map((_, idx) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (11 - idx), 1);
    const year = d.getFullYear();
    const month = d.getMonth(); // 0–11
    const chave = `${year}-${String(month+1).padStart(2,'0')}`;
    return { chave, label: monthLabels[month] };
  });

  const histogramData = last12.map(({ chave, label }) => {
    const total = transactions
      .filter(t => t.data.startsWith(chave) && t.tipo_transacao.toLowerCase() === 'saida')
      .reduce((sum, t) => sum + t.valor, 0);
    return { month: label, gastos: total };
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

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Receitas do Mês"
          value={`R$ ${sumReceitas.toFixed(2)}`}
          trend={`+ R$ ${(sumReceitas - sumDespesas).toFixed(2)}`}
          icon={<TrendingUp size={24} color="#039e00" />}
        />
        <SummaryCard
          title="Gastos do Mês"
          value={`R$ ${sumDespesas.toFixed(2)}`}
          trend={`- R$ ${(sumDespesas - sumReceitas).toFixed(2)}`}
          icon={<TrendingDown size={24} color="#d90202" />}
        />
        <SummaryCard
          title="Saldo Atual"
          value={`R$ ${saldoAtual.toFixed(2)}`}
          icon={<Wallet size={24} color="#004cff" />}
        />
        <SummaryCard
          title="Meta do Mês"
          value="R$ 4.000,00"
          icon={<Target size={24} color="#5e00d1" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Histogram data={histogramData}/>
        <ExpensesTable title="Principais Gastos do Mês" data={recent} />
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