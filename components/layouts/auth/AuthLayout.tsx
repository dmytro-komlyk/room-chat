import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// import Footer from '../../navigation/footer/Footer';
// import Header from '../../navigation/header/Header';
import styles from '../../../styles/AuthForm.module.scss';

export type IAuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && status === 'authenticated') {
      router.push('/');
    }
  }, [router, session, status]);

  if (status === 'loading') {
    return <>loading</>;
  }

  return status === 'unauthenticated' ? (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          {/* <div className={styles.cartoonImg}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div> */}
        </div>
        <div className="right flex flex-col justify-evenly">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </div>
  ) : (
    <>Redirect</>
  );
};

export default AuthLayout;
