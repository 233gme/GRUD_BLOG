import './styles.css';
import Button from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation('errorPage');
  const reloadPage = () => location.reload();

  return (
    <div className="container error_page">
      <h2>{t('main')}</h2>
      <Button action={reloadPage}>{t('btn')}</Button>
    </div>
  );
};

export default ErrorPage;
