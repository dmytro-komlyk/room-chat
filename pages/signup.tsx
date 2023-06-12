import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RegisterForm from '../components/form/registerform/RegisterForm';
import AuthLayout from '../components/layouts/auth/AuthLayout';
import { loginUser } from '../helpers/authentication';
import { IRegisterUserParams } from '../types/index';
import { NextPageWithLayout } from './page';

const SignUp: NextPageWithLayout = () => {
  const router = useRouter();

  const handleSubmitForm = async ({
    userName,
    email,
    password,
  }: IRegisterUserParams) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ userName, email, password }),
    };

    const { data } = await axios(
      'http://localhost:3000/api/auth/signup',
      options
    );

    if (data.success) {
      const loginRes = await loginUser({
        email: data.user.email,
        password,
      });

      if (loginRes && !loginRes.ok) {
        throw Error(loginRes.error);
      } else {
        router.push('/');
      }
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            officia?
          </p>
        </div>
        <RegisterForm onSubmit={handleSubmitForm} />
        <p className="text-center text-gray-400 ">
          Have an account?{' '}
          <Link href={'/signin'} className="text-blue-700">
            Sign In
          </Link>
        </p>
      </section>
    </>
  );
};
export default SignUp;

SignUp.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
