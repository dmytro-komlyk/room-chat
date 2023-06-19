import { ISidebarLayoutProps } from './SidebarLayout';

const base: ISidebarLayoutProps = {
  toggleTheme: () => {},
  toggleLanguage: () => {},
  children: '{{component}}',
};

export const mockSidebarLayoutProps = {
  base,
};
