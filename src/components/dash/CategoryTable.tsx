// src/components/dash/CategoryTable.tsx

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

import { Pencil, Trash2 } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Categoria {
  id: number | string;
  nome: string;
}

interface CategoryTableProps {
  data: Categoria[];
}

export default function CategoriesTable({ data }: CategoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Categoria>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'nome',
      header: 'Nome da Categoria',
    },
    {
      id: 'actions', 
      header: 'Ações',
      cell: ({ row }) => {
        const categoria = row.original;
        return (
          <div className="space-x-2">
            <Button variant="outline" size="icon" onClick={() => alert(`Editar: ${categoria.nome}`)}>
             <Pencil className="h-4 w-4" style={{ color: '#0837c4' }} />
            </Button>
            <Button className='bg-red-100 hover:bg-red-200' variant="destructive" size="icon" onClick={() => alert(`Excluir: ${categoria.nome}`)}>
              <Trash2 className="h-4 w-4" style={{ color: '#c41c1c' }} />
            </Button>
          </div>
        );
      },
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
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  Nenhuma categoria encontrada.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}