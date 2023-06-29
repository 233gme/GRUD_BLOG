import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useTheme } from './components/shared/providers';

import Header from 'components/widgets/Header';
import { Home, NotFound } from './pages';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'*'} element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
