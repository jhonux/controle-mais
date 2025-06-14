// app/categorias/page.tsx

import { getCategories } from '@/lib/data';
import CategoriesTable from '@/components/dash/CategoryTable'; 
import CategoriaModalForm from '@/components/form/CategoriaModalForm';

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
        <CategoriaModalForm />
        {/* Futuramente, um botão para adicionar nova categoria pode vir aqui */}
      </header>

      <main>
        <CategoriesTable data={categories} />
      </main>
    </div>
  );
}