'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface TipoOption {
    value: string;
    label: string;
}

interface TipoTransacaoSelectProps {
    name: string;
    label: string;
}

export function TipoTransacaoSelect({ name, label }: TipoTransacaoSelectProps) {
    const { control, formState: { errors } } = useFormContext();
    const [tipos, setTipos] = useState<TipoOption[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const response = await fetch('/api/tipos-transacao');
                if (!response.ok) throw new Error('Falha ao carregar tipos de transação');

                const data = await response.json();

                const displayLabels: { [key: string]: string } = {
                    'entrada': 'Entrada',
                    'saida': 'Saída'
                };
                
                const options = data.map((tipo: { id: any; nome: any; }) => ({
                    value: String(tipo.id), 
                    label: displayLabels[tipo.nome.toLowerCase()] || tipo.nome, 
                }));
                setTipos(options);
            } catch (error) {
                console.error("Erro no TipoTransacaoSelect:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTipos();
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
                            <SelectValue placeholder={isLoading ? "Carregando..." : "Selecione o tipo"} />
                        </SelectTrigger>
                        <SelectContent>
                            {tipos.map(option => (
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