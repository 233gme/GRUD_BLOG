import './App.css';
import { useTheme } from 'shared/providers';
import Header from 'widgets/Header';
import AppRouter from './shared/providers/AppRouter/AppRouter';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <Header/>
      <AppRouter/>
    </div>
  );
}

export default App;
