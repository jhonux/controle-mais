'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { CategorySelect } from '@/components/dash/CategorySelect';
import  CategoriaModalForm  from '@/components/form/CategoriaModalForm';
import { FormaPagamentoSelect } from '@/components/dash/FormaPagamentoSelect';
import  FormaPgtoModalForm  from '@/components/form/FormaPagamentoForm';

import { mockCategorias, mockPagamentos } from '@/lib/mock-data';
import { FormDatePicker } from '@/components/form/form-fields/FormDatePicker';
import { FormInput } from '@/components/form/form-fields/FormInput';
import { FormSelect } from '@/components/form/form-fields/FormSelect';


const transactionSchema = z.object({
  tipo: z.enum(['Receita', 'Despesa'], {
    required_error: 'O tipo é obrigatório.',
  }),
  valor: z
    .number({ invalid_type_error: 'O valor é obrigatório.' })
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
      tipo: undefined,
      valor: undefined,
      data: undefined,
      categoria: '',
      formaPagamento: '',
      descricao: '',
    },
  });

  const { handleSubmit, reset } = methods;
  const router = useRouter();

  const onSubmit = (data: FormData) => {
   
    console.log('Form data:', data);

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
          {/* 4. Componentes de formulário reutilizáveis e limpos */}
          <FormSelect
            name="tipo"
            label="Tipo *"
            placeholder="Selecione o tipo"
            options={[
              { value: 'Receita', label: 'Receita' },
              { value: 'Despesa', label: 'Despesa' },
            ]}
          />

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
              
              <CategorySelect name="categoria" label='Categoria *' categorias={mockCategorias} />
            </div>
            <CategoriaModalForm />
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <FormaPagamentoSelect
              label='Forma de Pagamento *'
                name="formaPagamento"
                formasPagamento={mockPagamentos}
              />
            </div>
            <FormaPgtoModalForm />
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