import { signIn } from 'next-auth/react';
import * as yup from 'yup';
import { ILoginUserParams } from '../common/types/index';

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginUser = async ({ email, password }: ILoginUserParams) => {
  const res = await signIn('credentials', {
    redirect: false,
    email,
    password,
    callbackUrl: '/',
  });

  return res;
};

export const loginSchemaValidate = yup.object().shape({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters'),
});

export const registerSchemaValidate = yup.object().shape({
  userName: yup
    .string()
    .required('User name is a required field')
    .min(1, 'User name is too short.'),
  email: yup
    .string()
    .required('Email is a required field')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters'),
  // .matches(passwordRules, { message: 'Please create a stronger password' }),
  passwordConfirmation: yup
    .string()
    .required('Confirm password is a required field')
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
});
