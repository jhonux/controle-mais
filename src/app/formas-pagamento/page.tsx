// Arquivo: app/formas-pagamento/page.tsx (Versão Melhorada)

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Landmark, Pencil, Plus, Trash2 } from "lucide-react"; // Ícones relevantes


interface FormaPagamento {
  id_forma_pagamento: number;
  nom_forma_pagamento: string;
}

interface FormaPagamentoResponse {
  items: FormaPagamento[];
}

const iconMap: { [key: string]: React.ElementType } = {
  pix: Landmark,
  "cartão de crédito": CreditCard,
  "cartão de débito": CreditCard,
  dinheiro: Landmark,
};

// --- Função de Busca de Dados ---
async function getFormasDePagamento() {
  try {
    const response = await fetch(
      "https://apex.oracle.com/pls/apex/controleplus/controle/forma_pagamento",
      { cache: "no-store" } 
    );
    if (!response.ok) throw new Error("Falha ao buscar dados da API");
    const data: FormaPagamentoResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error(error);
    return [];
  }
}


export default async function Page() {
  const formasDePagamento = await getFormasDePagamento();

  return (
    <div className="p-4 sm:p-6 md:p-8">
   
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Formas de Pagamento
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie suas formas de pagamento utilizadas nas transações.
          </p>
        </div>
        
      </header>

      <Card>
        <CardContent className="p-0">
        
          <div className="divide-y divide-gray-200">
            {formasDePagamento.map((forma) => {
              const Icon = iconMap[forma.nom_forma_pagamento.toLowerCase()] || CreditCard;

              return (
                <div key={forma.id_forma_pagamento} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  {/* Lado esquerdo: Ícone e Nome */}
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-2 rounded-md">
                        <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="font-medium">{forma.nom_forma_pagamento}</span>
                  </div>

                  {/* Lado direito: Botões de Ação */}
                  {/* <div className="space-x-2">
                     <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4 text-blue-600" />
                     </Button>
                     <Button variant="destructive" size="icon" className="bg-red-100 hover:bg-red-200">
                        <Trash2 className="h-4 w-4 text-red-600" />
                     </Button>
                  </div> */}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}