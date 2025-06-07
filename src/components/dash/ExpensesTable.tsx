'use client';

import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import { GoTrash } from 'react-icons/go';
import { HiPencil } from 'react-icons/hi';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Expense {
  category: string;
  value: string;
  date: string;
  description: string;
}

interface ExpensesTableProps {
  title: string;
  data: Expense[];
}

export default function ExpensesTable({ title, data }: ExpensesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleEdit = (item: Expense) => {
    console.log('Editar:', item);
  };

  const handleDelete = (item: Expense) => {
    console.log('Deletar:', item);
    if (confirm(`Deseja deletar ${item.description}?`)) {
      console.log('Item deletado:', item);
      // aqui você pode adicionar a lógica para excluir de fato
    }
  };

  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: 'category',
      header: 'Categoria',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'value',
      header: 'Valor',
      cell: info => {
        const val = info.getValue<string>();
        return (
          <span
            className={
              val.startsWith('-')
                ? 'text-red-500'
                : val.startsWith('+')
                ? 'text-green-500'
                : ''
            }
          >
            {val}
          </span>
        );
      },
    },
    {
      accessorKey: 'date',
      header: 'Data',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'description',
      header: 'Descrição',
      cell: info => info.getValue(),
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={() => handleEdit(row.original)}
            aria-label="Editar"
          >
            <HiPencil size={16} />
          </button>
          <button
            className="text-red-700 hover:text-red-900 focus:outline-none"
            onClick={() => handleDelete(row.original)}
            aria-label="Deletar"
          >
            <GoTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">
        {title === 'Principais Gastos do Mês'
          ? 'Transações mais importantes de dezembro'
          : 'Suas transações mais recentes'}
      </p>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className="cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Nenhum dado encontrado.
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} className="border-t">
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
