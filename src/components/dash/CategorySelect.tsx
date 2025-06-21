'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface CategorySelectProps {
  name: string;
  label: string;
}

interface CategoriaOption {
  value: string;
  label: string;
}

export function CategorySelect({ name, label }: CategorySelectProps) {
  const { control, formState: { errors } } = useFormContext(); 
  const [categorias, setCategorias] = useState<CategoriaOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('/api/categorias'); 
        if (!response.ok) throw new Error('Falha ao carregar categorias');
        
        const data = await response.json();
        
        const options = data.map((cat: { id: any; nome: any; }) => ({
          value: String(cat.id),
          label: cat.nome,
        }));

        setCategorias(options);
      } catch (error) {
        console.error("Erro no CategorySelect:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategorias();
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
              <SelectValue placeholder={isLoading ? "Carregando categorias..." : "Selecione uma categoria"} />
            </SelectTrigger>
            <SelectContent>
              {categorias.map(option => (
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