'use client';

import { useForm } from "react-hook-form";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; 

interface Categoria {
    id: number | string;
    nome: string;
}

interface CategoriaFormValues {
    nome: string;
}

interface EditCategoryModalProps {
    category: Categoria;
    children: React.ReactNode;
}

export default function EditCategoryModal({ category, children }: EditCategoryModalProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoriaFormValues>();

    useEffect(() => {
        if (open) {
            reset({ nome: category.nome });
        }
    }, [open, category, reset]);

    const onSubmit = (data: CategoriaFormValues) => {
        startTransition(async () => {
            const apiUrl = `https://apex.oracle.com/pls/apex/controleplus/controle/categoria?id=${category.id}`;
            try {
                const response = await fetch(apiUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nom_categoria: data.nome,
                    }),
                });

                if (!response.ok) throw new Error("Falha ao atualizar a categoria.");

                toast.success("Categoria atualizada com sucesso!");

                startTransition(() => {
                    router.refresh();

                })
                setOpen(false);

            } catch (error: any) {
                toast.error(error.message);
            }
        });
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            reset();
        }
        setOpen(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Categoria</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor={`edit-category-name-${category.id}`}>Nome</Label>
                        <Input
                            id={`edit-category-name-${category.id}`}
                            {...register("nome", { required: "O nome é obrigatório" })}
                            disabled={isPending}
                        />
                        {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" type="button" onClick={() => setOpen(false)} disabled={isPending}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isPending ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}