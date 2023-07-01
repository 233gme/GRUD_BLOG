import './App.css';
import { useTheme } from 'shared/providers';
import Header from 'widgets/Header';
import AppRouter from 'shared/providers/AppRouter/AppRouter';
import useElementWidth from 'shared/hoooks/useElementWidth/useElementWidth';

function App() {
  const { theme } = useTheme();
  const [ref, width] = useElementWidth();

  return (
    <div className={`App ${theme}`} ref={ref}>
      <Header width={width}/>
      <AppRouter/>
    </div>
  );
}

export default App;
