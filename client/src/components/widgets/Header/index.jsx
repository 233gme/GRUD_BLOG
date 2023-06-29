import './styles.css';
import { Link } from 'react-router-dom';
import MoonIcon from 'components/shared/assets/icons/moon';
import SunIcon from 'components/shared/assets/icons/sun';
import Button from 'components/widgets/Button';
import { useTheme } from 'components/shared/providers';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="header container">
      <Link to="/"><h1>BLOG</h1></Link>
      <div className="btn_block">
        <Button action={toggleTheme} type={'round'}>{theme === 'light' ? <MoonIcon/> : <SunIcon/>}</Button>
        <Button type={'pink'}>{'SingUp'}</Button>
        <Button>{'LogIn'}</Button>
      </div>
    </div>
  );
}

export default Header;
