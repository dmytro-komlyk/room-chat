import { Switch } from '@mui/material';
import styles from './ThemeUISwitch.module.scss';

interface IThemeUISwitch {
  onChange: () => void;
}

const ThemeUISwitch = ({ onChange }: IThemeUISwitch) => {
  return <Switch className={styles.switchTheme} onChange={onChange} />;
};

export default ThemeUISwitch;
