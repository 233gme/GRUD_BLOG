import './App.css';

import { Route, Routes } from 'react-router-dom';

import Header from 'components/Header';
import { Home, NotFound } from './pages';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'*'} element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
