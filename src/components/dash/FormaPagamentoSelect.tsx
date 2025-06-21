'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface FormaPagamentoOption {
  value: string;
  label: string;
}

interface FormaPagamentoSelectProps {
  name: string;
  label: string;
}

export function FormaPagamentoSelect({ name, label }: FormaPagamentoSelectProps) {
  const { control, formState: { errors } } = useFormContext();
  const [formasPagamento, setFormasPagamento] = useState<FormaPagamentoOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormasPagamento = async () => {
      try {
        const response = await fetch('/api/formas-pagamento');
        if (!response.ok) throw new Error('Falha ao carregar formas de pagamento');
        
        const data = await response.json();
        const options = data.map((fp: { id: any; nome: any; }) => ({
          value: String(fp.id),
          label: fp.nome,
        }));
        setFormasPagamento(options);
      } catch (error) {
        console.error("Erro no FormaPagamentoSelect:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormasPagamento();
  }, []);

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isLoading}
          >
            <SelectTrigger id={name}>
              <SelectValue placeholder={isLoading ? "Carregando..." : "Selecione a forma de pagamento"} />
            </SelectTrigger>
            <SelectContent>
              {formasPagamento.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errorMessage && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
    </div>
  );
}