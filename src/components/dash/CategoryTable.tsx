'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  flexRender, 
  ColumnDef, 
  SortingState, 
} from '@tanstack/react-table';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog'; 
import EditCategoryModal from '../form/EditCategoryModal';

interface Categoria {
  id: number | string;
  nome: string;
}

interface CategoryTableProps {
  data: Categoria[];
}

export default function CategoriesTable({ data }: CategoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleDelete = async (categoryId: number | string) => {
    setIsDeleting(true);
    const apiUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/categoria?id=${categoryId}`;

    try {
      const response = await fetch(apiUrl, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error("Falha ao excluir a categoria. Verifique se ela não está em uso.");
      }

      toast.success("Categoria excluída com sucesso!");
      startTransition(() => {
        router.refresh();

      })

    } catch (error: any) {
      toast.error(error.message || "Não foi possível excluir a categoria.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<Categoria>[] = [
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
            <EditCategoryModal category={categoria}>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" style={{ color: '#0837c4' }} />
              </Button>
            </EditCategoryModal>
            <DeleteConfirmationDialog
              itemName={categoria.nome}
              onConfirm={() => handleDelete(categoria.id)}
              isLoading={isDeleting}
            >
              <Button className='bg-red-100 hover:bg-red-200' variant="destructive" size="icon" disabled={isDeleting}>
                <Trash2 className="h-4 w-4" style={{ color: '#c41c1c' }} />
              </Button>
            </DeleteConfirmationDialog>
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
      <div className="rounbded-md overflow-x-auto relative max-h-[550px] overflow-y-auto">
        {isPending && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="cursor-pointer select-none" onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{ 'asc': ' 🔼', 'desc': ' 🔽' }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  Nenhuma categoria encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}