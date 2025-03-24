import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import eagleLogo from "../../assets/EagleWearLogo.png"
import useRegister from "./hooks/useRegister"
import { Link } from "react-router"


export const Register = () => {
  const { form, onSubmit } = useRegister();

  return (
    <main className="flex flex-col p-4 pt-1 h-dvh bg-gray-50 justify-center">
      <img src={eagleLogo} loading="lazy" alt="eaglewear logo" className="aspect-square w-24 mb-2 mx-auto" />
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-bold text-2xl">Crear Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección de email</FormLabel>
                    <FormControl>
                      <Input placeholder="correo@hotmail.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="*****" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>La contraseña debe tener al menos 8 caracteres</FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Registrarse</Button>
              <p>
                ¿Ya tienes una cuenta? <Link to="/login" className="font-semibold text-red-600">Acceder</Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
