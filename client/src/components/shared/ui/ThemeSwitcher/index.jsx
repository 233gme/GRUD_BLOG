import './styles.css';
import { ReactComponent as SunIcon } from 'components/shared/assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from 'components/shared/assets/icons/moon.svg';
import Button from 'components/shared/ui/Button';
import { useTheme } from 'components/shared/providers';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      action={toggleTheme}
      type={'round'}
    >
      {
        theme === 'light'
          ? <MoonIcon/>
          : <SunIcon/>
      }
    </Button>
  );
};

export default ThemeSwitcher;
