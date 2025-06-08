// import { Controller, Control, FieldErrors } from 'react-hook-form';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';

// interface Categoria {
//     id: string;
//     nome: string;
// }

// interface CategorySelectProps {
//     name: string;
//     label: string;
//     categorias: Categoria[];
//     required?: boolean;
// }

// export function CategorySelect({
//     name,
//     label,
//     categorias,
//     required = false,
// }: CategorySelectProps) {
//     return (
//         <div className="space-y-2">
//             <Label htmlFor={name}>{label} {required && '*'}</Label>
//             <Controller
//                 control={control}
//                 name={name}
//                 rules={required ? { required: `${label} é obrigatório` } : undefined}
//                 render={({ field }) => (
//                     <Select onValueChange={field.onChange} value={field.value}>
//                         <SelectTrigger id={name} className="w-full">
//                             <SelectValue placeholder={`Selecione ${label.toLowerCase()}`} />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {categorias.map((categoria) => (
//                                 <SelectItem key={categoria.id} value={categoria.nome}>
//                                     {categoria.nome}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 )}
//             />
//             {errors[name] && (
//                 <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
//             )}
//         </div>
//     );
// }