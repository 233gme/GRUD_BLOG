import { ReactComponent as SunIcon } from 'components/shared/assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from 'components/shared/assets/icons/moon.svg';
import { useTheme } from 'components/shared/providers';
import IconButton from '../IconButton';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton action={toggleTheme}>
      {
        theme === 'light'
          ? <MoonIcon/>
          : <SunIcon/>
      }
    </IconButton>
  );
};

export default ThemeSwitcher;
