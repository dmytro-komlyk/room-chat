import { Switch, SwitchProps } from '@mui/material';
import styles from './ThemeUISwitch.module.scss';

const ThemeUISwitch = (props: SwitchProps) => {
  return <Switch className={styles.switchTheme} {...props} />;
};

export default ThemeUISwitch;
