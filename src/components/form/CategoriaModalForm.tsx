'use client'

import { useForm } from "react-hook-form"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CategoriaFormValues {
    nome: string
}

interface CategoriaModalFormProps {
    onSave?: (categoria: CategoriaFormValues) => void
}

export default function CategoriaModalForm({ onSave }: CategoriaModalFormProps) {
    const [open, setOpen] = useState(false)

    // Formulário independente para o modal
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoriaFormValues>()

    const onSubmit = (data: CategoriaFormValues) => {
        console.log("Categoria cadastrada:", data)

        // Chama a função onSave passada pelo componente pai
        if (onSave) {
            onSave(data)
        }

        // Reset do formulário do modal e fecha o modal
        reset()
        setOpen(false)
    }


    const handleSave = () => {
        handleSubmit(onSubmit)()
    }

    const handleCancel = () => {
        reset()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" className="ml-2">+</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nova Categoria</DialogTitle>
                </DialogHeader>

                {/* Formulário isolado - não interfere no form principal */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <div className="mb-2">
                            <Label htmlFor="category-name" className="text-right">
                                Nome
                            </Label>
                        </div>
                        <div>
                        <Input
                            className="col-span-2 w-full"
                            id="category-name"
                            {...register("nome", { required: "O nome é obrigatório" })}
                            placeholder="Ex: Alimentação, Transporte..."
                        />
                        {errors.nome && (
                            <span className="text-red-500 text-sm">{errors.nome.message}</span>
                        )}

                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </Button>
                        <Button onClick={handleSave}>Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}