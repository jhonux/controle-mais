interface CategoryExpense {
  category: string;
  value: string;
}

export default function CategoryExpenses() {
  const expenses: CategoryExpense[] = [
    { category: 'Alimentação', value: 'R$ 4.500,00' },
    { category: 'Transporte', value: 'R$ 4.320,00' },
    { category: 'Saúde', value: 'R$ 3.850,00' },
    { category: 'Educação', value: 'R$ 2.680,00' },
    { category: 'Lazer', value: 'R$ 2.180,00' },
    { category: 'Casa', value: 'R$ 2.600,00' },
    { category: 'Vestuário', value: 'R$ 1.450,00' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Principais Gastos do Ano</h3>
      <p className="text-gray-600 text-sm mb-4">Total gasto por categoria em 2024</p>
      <ul className="space-y-2">
        {expenses.map((item, index) => (
          <li key={index} className="flex justify-between py-2 border-t">
            <span>{item.category}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}