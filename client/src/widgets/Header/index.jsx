import { useEffect, useState } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from 'widgets/ThemeSwitcher';
import LangSwitcher from 'widgets/LangSwitcher';
import IconButton from 'shared/ui/IconButton';
import { ReactComponent as MenuIcon } from 'shared/assets/icons/menu.svg';
import { ReactComponent as CloseMenuIcon } from 'shared/assets/icons/x.svg';
import { ReactComponent as PowerIcon } from 'shared/assets/icons/power.svg';
import { ReactComponent as UserIcon } from 'shared/assets/icons/user.svg';
import { ReactComponent as PlusIcon } from 'shared/assets/icons/plus.svg';

import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from 'shared/config/redux/slices/auth';

const Header = ({ width }) => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState(false);
  const [hideMenu, setHideMenu] = useState(true);
  const handleMenu = () => setHideMenu(!hideMenu);
  const navigator = useNavigate();

  useEffect(() => {
    if (1024 > width) {
      setMobile(true);
      setHideMenu(true);
    } else {
      setMobile(false);
    }
  }, [width]);

  const headerBtnClass = `btn_block ${mobile ? hideMenu ? 'mobile_btn_block' : '' : ''}`;

  const onClickLogOut = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  };

  const onLogInPage = () => {
    navigator('/login');
  };

  const onAddPostPage = () => {
    navigator('/posts/create');
  };

  return (
    <div className="container header_container">
      <div className="header">
        <Link to="/"><h1>BLOG</h1></Link>
        <div className={headerBtnClass}>
          <LangSwitcher/>
          <ThemeSwitcher/>
          {isAuth ? (
            <IconButton action={onAddPostPage}>
              <PlusIcon/>
            </IconButton>
          ) : null
          }
          {
            !isAuth ? (
              <IconButton action={onLogInPage}>
                <UserIcon/>
              </IconButton>
            ) : (
              <IconButton action={onClickLogOut}>
                <PowerIcon/>
              </IconButton>
            )
          }
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
