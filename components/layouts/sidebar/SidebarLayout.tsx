import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import WindowIcon from '@mui/icons-material/Window';
import {
  AppBar,
  Avatar,
  Button,
  FormControlLabel,
  FormGroup,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import * as React from 'react';
import admin from '../../../public/admin.png';
import LanguageSwitch from '../../switch/language/LanguageSwitch';
import ThemeUISwitch from '../../switch/theme/ThemeUISwitch';

const navItems = [
  { Icon: WindowIcon, value: 'home' },
  { Icon: ChatIcon, value: 'chat' },
  { Icon: PersonOutlineIcon, value: 'contact' },
  { Icon: NotificationsNoneIcon, value: 'notifications' },
  { Icon: CalendarMonthIcon, value: 'calendar' },
  { Icon: SettingsIcon, value: 'settings' },
];

export interface ISidebarLayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

const SidebarLayout: React.FC<ISidebarLayoutProps> = (props) => {
  const { t } = useTranslation();

  return (
    <AppBar
      component="nav"
      square
      className="w-16 h-full lg:w-60 top-0 left-0 pt-20 pb-10 shadow-none bg-white text-slate-500"
    >
      <Stack gap={2} alignItems="center" className="mb-10">
        <Avatar className="w-12 lg:w-24 h-12 lg:h-24">
          <Image src={admin} alt="admin" fill />
        </Avatar>
        <Typography
          variant="body1"
          component="div"
          className="hidden lg:block text-slate-950"
        >
          User name
        </Typography>
      </Stack>
      <MenuList className="flex flex-col gap-y-2 sm:gap-y-4 md:gap-y-6 lg:gap-y-8">
        {navItems.map(({ Icon, value }, id) => (
          <MenuItem
            key={id}
            className="group hover:pl-3 hover:border-l-4 border-solid border-blue-500"
          >
            <ListItemIcon>
              <Icon fontSize="medium" className="group-hover:fill-blue-500" />
            </ListItemIcon>
            <ListItemText className="hidden lg:inline-block group-hover:text-blue-500">
              {t(`sidebar.nav.${value}`)}
            </ListItemText>
          </MenuItem>
        ))}
      </MenuList>
      <FormGroup className="flex flex-row justify-center gap-3 lg:gap-3 mt-auto">
        <FormControlLabel
          className="m-0"
          control={<ThemeUISwitch onChange={props.toggleTheme} />}
          label=""
        />
        <FormControlLabel
          className="m-0"
          control={<LanguageSwitch onChange={props.toggleLanguage} />}
          label=""
        />
        <Button
          className="basis-full group text-slate-500 hover:text-blue-500"
          variant="text"
          size="large"
          startIcon={<LogoutIcon className="group-hover:fill-blue-500" />}
        >
          <span className="hidden lg:inline-block">
            {t('sidebar.controls.logOut')}
          </span>
        </Button>
      </FormGroup>
    </AppBar>
  );
};

export default SidebarLayout;
