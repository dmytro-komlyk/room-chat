import { wrapper } from '@/lib/redux';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  const { status } = useSession();
  const { t } = useTranslation();
  // const rooms = useSelector(selectRooms);
  // console.log(rooms);
  return status === 'authenticated' ? (
    <div
      className={`fixed top-0 right-0 h-full w-[calc(100%-4rem)] lg:w-[calc(100%-15rem)] bg-gradient-to-r from-[#F3F3FB] to-[#FDFBFD]`}
    >
      <section>{t('sidebar.nav.home')}</section>
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

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async ({ req, res, query, locale, ...etc }) => {
    // await store.dispatch();

    return {
      props: {
        // pass the translation props to the page component
        ...(await serverSideTranslations(locale as string)),
      },
    };
  };
});
