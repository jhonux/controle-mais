import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CategoriaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategoriaModal({ open, onOpenChange }: CategoriaModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg sm:w-full">
        <DialogHeader>
          <DialogTitle>Adicionar Categoria</DialogTitle>
        </DialogHeader>
        {/* Seu formulário de categoria aqui */}
        <div className="mt-2">
          <p>Formulário para adicionar categoria</p>
          {/* Inputs, botões, etc */}
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="mt-6 w-full">
            Fechar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
