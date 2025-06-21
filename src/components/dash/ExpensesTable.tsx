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
          ? 'Transações mais importantes de Junho'
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
                <TableCell colSpan={4} className="text-center py-4">
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
