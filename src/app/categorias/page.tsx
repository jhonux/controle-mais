import CategoriesList, { Categoria } from "@/components/categories/categoriesList";

export default async function Page() {
  const userId = 1;
  const url = `https://apex.oracle.com/pls/apex/controleplus/controle/categoria?P_ID_USUARIO=${userId}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) throw new Error(`Falha ao carregar categorias: ${res.status}`);
  const raw = await res.json();

  let items: Categoria[];
  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && Array.isArray((raw as any).items)) {
    items = (raw as any).items;
  } else {
    throw new Error("Formato de resposta inválido");
  }

  return <CategoriesList initialItems={items} />;
}