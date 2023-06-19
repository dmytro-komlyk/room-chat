import { Switch } from '@mui/material';
import { useTranslation } from 'next-i18next';
import styles from './LanguageSwitch.module.scss';

interface ILanguageSwitch {
  onChange: () => void;
}

const LanguageSwitch = ({ onChange }: ILanguageSwitch) => {
  const { i18n } = useTranslation();
  const { language: currentLanguage } = i18n;

  return (
    <Switch
      className={styles.switchLanguage}
      onChange={onChange}
      checked={currentLanguage === 'en'}
    />
  );
};

export default LanguageSwitch;
