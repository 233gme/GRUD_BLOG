import './styles.css';
import LinkButton from 'shared/ui/LinkButton';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation('notFoundPage');

  return (
    <div className="container not_found">
      <h2>{t('main')}</h2>
      <LinkButton path={'/'}>{t('btn')}</LinkButton>
    </div>
  );
};

export default NotFound;
