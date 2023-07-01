import { useEffect, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import Button from 'shared/ui/Button';
import ThemeSwitcher from 'widgets/ThemeSwitcher';
import LangSwitcher from 'widgets/LangSwitcher';
import IconButton from 'shared/ui/IconButton';
import { ReactComponent as MenuIcon } from 'shared/assets/icons/menu.svg';
import { ReactComponent as CloseMenuIcon } from 'shared/assets/icons/x.svg';

const Header = ({ width }) => {
  const [mobile, setMobile] = useState(false);
  const [hideMenu, setHideMenu] = useState(true);
  const handleMenu = () => setHideMenu(!hideMenu);

  useEffect(() => {
    if (1024 > width) {
      setMobile(true);
      setHideMenu(true);
    } else {
      setMobile(false);
    }
  }, [width]);

  const headerBtnClass = `btn_block ${mobile ? hideMenu ? 'mobile_btn_block' : '' : ''}`;

  return (
    <div className="container header_container">
      <div className="header">
        <Link to="/"><h1>BLOG</h1></Link>
        <div className={headerBtnClass}>
          <LangSwitcher/>
          <ThemeSwitcher/>
          <Button type={'pink'}>{'SingUp'}</Button>
          <Button>{'LogIn'}</Button>
          {
            mobile ? (
              <IconButton action={handleMenu}>
                <CloseMenuIcon/>
              </IconButton>
            ) : null
          }
        </div>
        <div className="menu_button">
          <IconButton action={handleMenu}>
            <MenuIcon/>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
