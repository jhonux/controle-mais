"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Tables() {
  return (
  <div className="mt-8 space-y-12">
      <div className="flex flex-wrap gap-8">
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-semibold mb-4">Principais gastos do mês</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$1,000.00</TableCell>
                
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-semibold mb-4">Transações recentes</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>30/05/2025</TableCell>
                  <TableCell>Supermercado</TableCell>
                    <TableCell className="text-center">Alimentação</TableCell>
                  <TableCell className="text-center">R$ 150,00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Metas financeiras</h2>
        <div className="overflow-x-auto">
          <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Item</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>30/05/2025</TableCell>
                  <TableCell>Supermercado</TableCell>
                    <TableCell className="text-left">Alimentação</TableCell>
                  <TableCell className="text-right">R$ 150,00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
}
