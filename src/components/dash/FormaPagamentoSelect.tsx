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

interface FormaPagamento {
  id: string;
  nome: string;
}

interface PgtoSelectProps {
  name: string; // nome do campo no form
  label: string; // label para o select
  formasPagamento: FormaPagamento[]; // array de formas de pagamento
  placeholder?: string;
  required?: boolean;
}

export function FormaPagamentoSelect({
  name,
  label,
  formasPagamento,
  placeholder = "Selecione uma forma de pagamento",
  required = false,
}: PgtoSelectProps) {
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
            <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {formasPagamento.length > 0 ? (
                formasPagamento.map((forma) => (
                  <SelectItem key={forma.id} value={forma.id}>
                    {forma.nome}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>
                  Nenhuma forma de pagamento disponível
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
