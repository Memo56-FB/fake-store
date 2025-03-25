import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { loginUser } from '../authServices';
import toast from 'react-hot-toast';
import { useStore } from 'zustand';
import { useAuthStore } from '../authStore';

const formSchema = z.object({
  username: z.string().nonempty({ message: "El usuario es requerido" }),
  password: z.string().nonempty({ message: "La contraseña es requerida" }),
});

export type FormData = z.infer<typeof formSchema>;

const useLogin = () => {
  const login = useStore(useAuthStore, (state) => state.login)
  
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    mutationKey: ['loginUser'],
    onSuccess: (data) => {
      navigate('/')
      login(data.token)
      toast.success(`Usuario logueado exitosamente`)
    },
    onError(error: { response: { data: string } }) {
      toast.error(error.response.data)
    },
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: FormData) => {
    mutate(values);
  };

  return { form, onSubmit, isPending };
};

export default useLogin;
