import './styles.css';
import { Link } from 'react-router-dom';
import Button from 'shared/ui/Button';
import ThemeSwitcher from 'widgets/ThemeSwitcher';
import LangSwitcher from 'widgets/LangSwitcher';

function Header() {
  return (
    <div className="header container">
      <Link to="/"><h1>BLOG</h1></Link>
      <div className="btn_block">
        <LangSwitcher/>
        <ThemeSwitcher/>
        <Button type={'pink'}>{'SingUp'}</Button>
        <Button>{'LogIn'}</Button>
      </div>
    </div>
  );
}

export default Header;