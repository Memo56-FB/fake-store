import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string().nonempty({ message: "El usuario es requerido" }),
  password: z.string().nonempty({ message: "La contraseña es requerida" }),
});

export type FormData = z.infer<typeof formSchema>;

const useLogin = () => {
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

export default useLogin;
