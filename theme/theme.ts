import { createTheme } from '@mui/material/styles';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfigModule from '../tailwind.config';

const tailwindConfig = resolveConfig(tailwindConfigModule);

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const getActiveTheme = (themeMode: 'light' | 'dark') => {
  return themeMode === 'light' ? lightTheme : darkTheme;
};

export default getActiveTheme;
