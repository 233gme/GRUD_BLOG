import './styles.css';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, selectIsAuth } from 'shared/config/redux/slices/auth';

const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const { t } = useTranslation('login');

  if (isAuth) {
    navigate('/');
  }

  const handleChange = (event) => {
    setLoginError(null);
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await dispatch(fetchLogin(formData));
    if (data?.error) {
      return setLoginError(data.error.message);
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  return (
    <div className="container login">
      <div className="login_form">
        <h2>{t('account')}</h2>
        <form onSubmit={onSubmit}>
          <input
            onChange={handleChange}
            placeholder={t('email')}
            type={'email'}
            name={'email'}
            required
          />
          <input
            onChange={handleChange}
            placeholder={t('password')}
            type={'password'}
            name={'password'}
            required
          />
          <button type='submit'>{t('login')}</button>
        </form>
        <span>-- {t('or')} --</span>
        <Link to={'/'}>{t('register')}</Link>
        {
          loginError ? (
            <span className={'error_message'}>{loginError}</span>
          ) : null
        }
      </div>
    </div>
  );
};

export default Login;
