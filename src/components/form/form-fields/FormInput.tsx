import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Definir a interface FormInputProps, estendendo as propriedades padrão de um <input>
type FormInputProps = {
  name: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>; // Substitui InputProps por React.InputHTMLAttributes<HTMLInputElement>

export function FormInput({ name, label, ...props }: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className={error ? 'text-red-500' : ''}>
        {label}
      </Label>
      <Input
        id={name}
        {...register(name, {
          valueAsNumber: props.type === 'number',
        })}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{String(error)}</p>}
    </div>
  );
}

