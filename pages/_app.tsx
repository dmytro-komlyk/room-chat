import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import getActiveTheme, { lightTheme } from '../theme/theme';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp = (props: AppPropsWithLayout) => {
  const [activeTheme, setActiveTheme] = useState(lightTheme);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light');
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';

    setSelectedTheme(desiredTheme);
  };

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme));
  }, [selectedTheme]);

  return (
    <ThemeProvider theme={activeTheme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          {getLayout(<Component {...pageProps} toggleTheme={toggleTheme} />)}
        </SessionProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default MyApp;
