import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Categoria {
  id_categoria:  number;
  fk_id_categoria: number;
  nom_categoria: string;
  des_preset:    "Y" | "N";
}

export default async function Page() {
  const userId = 1;
  const url = `https://apex.oracle.com/pls/apex/controleplus/controle/categoria?P_ID_USUARIO=${userId}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Falha ao carregar categorias: ${res.status}`);
  }

  const raw = await res.json();

  let items: Categoria[];
  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && Array.isArray((raw as any).items)) {
    items = (raw as any).items;
  } else {
    throw new Error("Formato de resposta inválido: esperado array ou { items: [...] }");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 space-y-1">
          {items.map((cat) => (
            <li key={cat.id_categoria}>
              <span className="font-semibold">{cat.nom_categoria}</span>
              {cat.des_preset === "Y" && (
                <span className="ml-2 italic text-gray-500">(preset)</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}