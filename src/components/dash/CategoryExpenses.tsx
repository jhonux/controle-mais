import React from 'react';

export interface CategoryExpense {
  category: string;
  value: string;
}

interface CategoryExpensesProps {
  data: CategoryExpense[];
}

export default function CategoryExpenses({ data }: CategoryExpensesProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Principais Gastos do Ano</h3>
      <p className="text-gray-600 text-sm mb-4">
        Total gasto por categoria em {currentYear}
      </p>
      <ul className="space-y-2">
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item.category} className="flex justify-between py-2 border-t">
              <span>{item.category}</span>
              <span>{item.value}</span>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 py-4">
            Nenhum gasto encontrado
          </li>
        )}
      </ul>
    </div>
  );
}