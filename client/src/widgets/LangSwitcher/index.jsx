import { ReactComponent as LangIcon } from 'shared/assets/icons/lang.svg';
import { useTheme } from 'shared/providers';
import IconButton from 'shared/ui/IconButton';
import { useTranslation } from 'react-i18next';

const LangSwitcher = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  const onToggleLang = async () =>
    await i18n.changeLanguage(i18n.language === 'en' ? 'it' : 'en');

  return (
    <IconButton action={onToggleLang} type={'fill'}>
      {<LangIcon/>}
    </IconButton>
  );
};

export default LangSwitcher;
