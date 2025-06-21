'use client';

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CategoriaFormValues {
    nome: string;
}

interface CategoriaModalFormProps {
    children?: React.ReactNode;
}

export default function CategoriaModalForm({ children }: CategoriaModalFormProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoriaFormValues>();

    const onSubmit = (data: CategoriaFormValues) => {
        startTransition(async () => {
            const apiUrl = "https://apex.oracle.com/pls/apex/controleplus/controle/categoria";
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nom_categoria: data.nome,
                        fk_id_usuario: 1
                    }),
                });

                if (!response.ok) throw new Error("Falha ao criar a categoria.");
                
                toast.success("Categoria criada com sucesso!");
                router.refresh();
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
            <DialogTrigger asChild>
                {children || <Button><Plus className="mr-2 h-4 w-4"/> Nova Categoria</Button>}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nova Categoria</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="create-category-name">Nome</Label>
                        <Input
                            id="create-category-name"
                            {...register("nome", { required: "O nome é obrigatório" })}
                            placeholder="Ex: Alimentação, Transporte..."
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
                            {isPending ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}