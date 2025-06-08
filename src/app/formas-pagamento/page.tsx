import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface FormaPagamento {
  id_forma_pagamento: number;
  nom_forma_pagamento: string;
}

interface FormaPagamentoResponse {
  items: FormaPagamento[];
}

export default async function Page() {
  // Busca os dados da API de forma de pagamento no servidor (SSR)
  const response = await fetch(
    "https://apex.oracle.com/pls/apex/controleplus/controle/forma_pagamento",
    { cache: "no-store" }  // cache: 'no-store' para sempre obter dados atualizados (SSR dinâmico)
  );
  const data: FormaPagamentoResponse = await response.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formas de Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 space-y-1">
          {data.items.map((forma) => (
            <li key={forma.id_forma_pagamento}>
              <span className="font-semibold">{forma.nom_forma_pagamento}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}