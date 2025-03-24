import api from "@/services/interceptor";
import { LoginReponseType, LoginType, RegisterType } from "@/types/authTypes";

export const createUser = (user: RegisterType): Promise<{id: string}> => {
  return api.post('/users', user)
}

export const loginUser = (user: LoginType): Promise<LoginReponseType> => {
  return api.post('/auth/login', user)
}