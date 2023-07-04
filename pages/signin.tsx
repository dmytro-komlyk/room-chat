import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ILoginUserParams } from '../common/types/index';
import LoginForm from '../components/form/loginform/LoginForm';
import AuthLayout from '../components/layouts/auth/AuthLayout';
import { loginUser } from '../helpers/authentication';
import { NextPageWithLayout } from './page';

const SignIn: NextPageWithLayout = () => {
  const router = useRouter();

  const handleSubmit = async (values: ILoginUserParams) => {
    const status = await loginUser(values);
    if (status?.ok) router.push(status.url || '/');
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            officia?
          </p>
        </div>
        <LoginForm onSubmit={handleSubmit} />
        <p className="text-center text-gray-400 ">
          dont have an account yet?{' '}
          <Link href={'/signup'} className="text-blue-700">
            Sign Up
          </Link>
        </p>
      </section>
    </>
  );
};
export default SignIn;

SignIn.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
