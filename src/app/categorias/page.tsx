// app/categorias/page.tsx

import { getCategories } from '@/lib/data';
import CategoriesTable from '@/components/dash/CategoryTable';
import CategoriaModalForm from '@/components/form/CategoriaModalForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default async function PaginaCategorias() {
  const userId = '1';
  const categories = await getCategories(userId);

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Categorias
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie suas categorias de despesas e receitas.
          </p>
        </div>
        <div className="hidden md:block">
          <CategoriaModalForm>
            <Button><Plus className="mr-2 h-4 w-4"/> Nova Categoria</Button>
          </CategoriaModalForm>
        </div>
      </header>

      <main>
        <CategoriesTable data={categories} />
      </main>
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <CategoriaModalForm>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-6 w-6" />
            <span className="sr-only">Nova Categoria</span>
          </Button>
        </CategoriaModalForm>
      </div>
    </div>
  );
}