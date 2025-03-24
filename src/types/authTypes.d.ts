export type RegisterType = {
  id?:       number;
  username: string;
  email:    string;
  password: string;
}

export type LoginType = {
  username: string;
  password: string;
}

export type LoginReponseType = {
  token: string;
}
