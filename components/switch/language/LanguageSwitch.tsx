import { Switch, SwitchProps } from '@mui/material';
import styles from './LanguageSwitch.module.scss';

const LanguageSwitch = (props: SwitchProps) => {
  return <Switch className={styles.switchLanguage} {...props} />;
};

export default LanguageSwitch;
