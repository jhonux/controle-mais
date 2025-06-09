"use client";

import { useState, useTransition, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface Categoria {
  id_categoria:  number;
  fk_id_categoria: number;
  nom_categoria: string;
  des_preset:    "Y" | "N";
}

interface Props {
  initialItems: Categoria[];
}

export default function CategoriesList({ initialItems }: Props) {
  const [items, setItems] = useState<Categoria[]>(initialItems);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const deleteBaseUrl = "https://apex.oracle.com/pls/apex/controleplus/controle/categoria";

  const handleDelete = (id: number) => {
    if (!confirm("Deseja mesmo excluir esta categoria?")) return;

    startTransition(async () => {
      const url = `${deleteBaseUrl}?id=${id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("DELETE error:", text);
        alert(`Falha ao excluir (status ${res.status})`);
        return;
      }

      // remove do state e define mensagem
      setItems((prev) => prev.filter((c) => c.id_categoria !== id));
      setMessage("Categoria excluída com sucesso!");
    });
  };

  // limpa a mensagem após 3s
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
      </CardHeader>

      <CardContent>
        {/* alerta inline */}
        {message && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
            {message}
          </div>
        )}

        <ul className="list-disc pl-6 space-y-2">
          {items.map((cat) => (
            <li key={cat.id_categoria} className="flex items-center justify-between">
                <div>
                    <span className="font-semibold">{cat.nom_categoria}</span>
                    {cat.des_preset === "Y" && (
                    <span className="ml-2 italic text-gray-500">(preset)</span>
                    )}
                </div>
                {cat.des_preset !== "Y" && (
                    <button
                        onClick={() => handleDelete(cat.id_categoria)}
                        disabled={isPending}
                        className="text-red-600 hover:underline disabled:opacity-50"
                    >
                        {isPending ? "..." : "DELETE"}
                    </button>
                )}
            </li>
          ))}
          {items.length === 0 && <li>Nenhuma categoria cadastrada.</li>}
        </ul>
      </CardContent>
    </Card>
  );
}