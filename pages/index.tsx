import { Button } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  const { status } = useSession();

  return status === 'authenticated' ? (
    <section>
      Home <Button onClick={() => signOut()}>Sign Out</Button>
    </section>
  ) : (
    <>Redirect</>
  );
};

export default Home;

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <SidebarLayout />
      {page}
    </PrimaryLayout>
  );
};
