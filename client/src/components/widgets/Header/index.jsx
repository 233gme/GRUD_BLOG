import './styles.css';
import { Link } from 'react-router-dom';
import Button from 'components/shared/ui/Button';
import { useTheme } from 'components/shared/providers';
import ThemeSwitcher from 'components/shared/ui/ThemeSwitcher';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="header container">
      <Link to="/"><h1>BLOG</h1></Link>
      <div className="btn_block">
        <ThemeSwitcher/>
        <Button type={'pink'}>{'SingUp'}</Button>
        <Button>{'LogIn'}</Button>
      </div>
    </div>
  );
}

export default Header;
