export interface IUser {
  _id?: string;
  email: string;
  userName: string;
}

export interface ILoginUserParams {
  email: string;
  password: string;
}

export interface IRegisterUserParams {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
