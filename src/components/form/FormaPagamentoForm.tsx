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

interface FormaPgtoFormValues {
    nome: string
}

interface FormaPgtoModalFormProps {
    onSave?: (categoria: FormaPgtoFormValues) => void
}

export default function FormaPgtoModalForm({ onSave }: FormaPgtoModalFormProps) {
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormaPgtoFormValues>()

    const onSubmit = (data: FormaPgtoFormValues) => {
        console.log("Forma de pagamento cadastrada:", data)
        if (onSave) {
            onSave(data)
        }
        reset()
        setOpen(false)
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
                <div className="space-y-4">
                    <div>
                        <div className="mb-2">
                            <Label htmlFor="payment-name" className="text-right">
                                Nome
                            </Label>
                        </div>
                        <div>
                        <Input
                            className="col-span-2 w-full"
                            id="payment-name"
                            {...register("nome", { required: "O nome é obrigatório" })}
                            placeholder="Ex: Cartão de Crédito, Dinheiro..."
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
                        <Button onClick={handleSubmit(onSubmit)}>Salvar</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}