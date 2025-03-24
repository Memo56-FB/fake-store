import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string().nonempty({ message: "El usuario es requerido" }),
  email: z.string().nonempty({ message: "El email es requerido" }).email({message: "El email es invalido"}),
  password: z.string().nonempty({ message: "La contraseña es requerida" }).min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export type FormData = z.infer<typeof formSchema>;

const useRegister = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: FormData) => {
    console.log(values);
  };

  return { form, onSubmit };
};

export default useRegister;
