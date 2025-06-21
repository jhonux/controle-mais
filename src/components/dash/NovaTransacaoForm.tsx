'use client';
import React, { useEffect, useState, startTransition } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns'; // Biblioteca para formatar datas

// Imports de UI e componentes
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { FormDatePicker } from '@/components/form/form-fields/FormDatePicker';
import { FormInput } from '@/components/form/form-fields/FormInput';
import { CategorySelect } from '@/components/dash/CategorySelect';
import { FormaPagamentoSelect } from '@/components/dash/FormaPagamentoSelect';
import { TipoTransacaoSelect } from '@/components/dash/TipoTransacaoSelect';

const transactionSchema = z.object({
  tipo: z.string().min(1, 'O tipo é obrigatório.'),
  valor: z.coerce.number({ invalid_type_error: 'O valor é obrigatório.' })
    .positive({ message: 'O valor deve ser maior que zero.' }),
  data: z.date({ required_error: 'A data é obrigatória.' }),
  categoria: z.string().min(1, 'A categoria é obrigatória.'),
  formaPagamento: z.string().min(1, 'A forma de pagamento é obrigatória.'),
  descricao: z.string().optional(),
});

type FormData = z.infer<typeof transactionSchema>;

export default function NovaTransacaoForm() {
  const methods = useForm<FormData>({
  
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      tipo: '',
      valor: undefined,
      data: new Date(),
      categoria: '',
      formaPagamento: '',
      descricao: '',
    },
  });

  const { handleSubmit, reset } = methods;
  const router = useRouter();

 const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const apiUrl = "https://apex.oracle.com/pls/apex/controleplus/controle/transacao";

      try {
        const requestBody = {
          fk_id_usuario: 1, 
          des_descricao: data.descricao,
          num_valor: data.valor,
          fk_id_tipo: parseInt(data.tipo, 10),
          fk_id_categoria: parseInt(data.categoria, 10),
          fk_id_forma_pagamento: parseInt(data.formaPagamento, 10),
          dat_transacao: format(data.data, 'dd-MM-yyyy'), 
          num_parcelas: 1 
        };

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) throw new Error("Falha ao salvar a transação.");

        toast.success("Transação salva com sucesso!");
        router.push('/');
        router.refresh();

      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  const handleCancelClick = () => {
    reset();
    router.push('/');
  }

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        
          <div className='mb-6'>
          <h1 className="text-2xl font-bold">Nova transação</h1>
          <p className="text-gray-600">Visão geral das suas finanças</p>
        </div>
     
     
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    
          <TipoTransacaoSelect name="tipo" label="Tipo *" />
          <FormInput
            name="valor"
            label="Valor *"
            type="number"
            placeholder="0,00"
            step="0.01"
          />

          <FormDatePicker name="data" label="Data *" />

          <div className="flex items-end gap-2">
            <div className="flex-1">
              
              <CategorySelect name="categoria" label='Categoria *' />
            </div>
            
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <FormaPagamentoSelect
              label='Forma de Pagamento *'
                name="formaPagamento"
              />
            </div>

          </div>

          <div>
            <Label htmlFor="descricao" className="text-sm font-semibold text-gray-700">
              Descrição
            </Label>
            <Textarea
              id="descricao"
              rows={4}
              {...methods.register('descricao')}
              className="mt-2"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleCancelClick}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}