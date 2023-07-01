import { ReactComponent as SunIcon } from 'shared/assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from 'shared/assets/icons/moon.svg';
import { useTheme } from 'shared/providers';
import IconButton from 'shared/ui/IconButton';

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
