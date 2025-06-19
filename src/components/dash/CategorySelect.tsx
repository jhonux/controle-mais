import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Categoria {
  id: string;
  nome: string;
}

interface CategorySelectProps {
  name: string; 
  label: string; 
  categorias: Categoria[];
  placeholder?: string;
  required?: boolean;
}

export function CategorySelect({
  name,
  label,
  categorias,
  placeholder = "Selecione uma categoria",
  required = false,
}: CategorySelectProps) {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div>
      <Label className="block text-sm font-semibold mb-2 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Controller
        control={control}
        name={name}
        rules={{ required: required ? "Campo obrigatório" : false }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value || ""} defaultValue="">
            <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>
                  Nenhuma categoria disponível
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message?.toString()}</p>
      )}
    </div>
  );
}
