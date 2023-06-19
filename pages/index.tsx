import { useSession } from 'next-auth/react';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
// import styles from '../styles/HomePage.module.scss';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  const { status } = useSession();
  return status === 'authenticated' ? (
    <div
      className={`fixed top-0 right-0 h-full w-[calc(100%-4rem)] lg:w-[calc(100%-15rem)] bg-gradient-to-r from-[#F3F3FB] to-[#FDFBFD]`}
    >
      <section>Home</section>
    </div>
  ) : (
    <>Redirect</>
  );
};

export default Home;

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <SidebarLayout {...page.props} />
      {page}
    </PrimaryLayout>
  );
};
