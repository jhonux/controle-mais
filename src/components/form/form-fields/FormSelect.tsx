import { useFormContext, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface FormSelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
}

export function FormSelect({ name, label, placeholder, options }: FormSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="w-full space-y-2">
      <Label htmlFor={name} className={error ? 'text-red-500' : ''}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger id={name} className='w-full focus:ring-blue-500'>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-red-500">{String(error)}</p>}
    </div>
  );
}