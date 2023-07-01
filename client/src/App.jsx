import './App.css';
import { useTheme } from 'shared/providers';
import Header from 'widgets/Header';
import AppRouter from 'shared/providers/AppRouter/AppRouter';
import useElementWidth from 'shared/hoooks/useElementWidth/useElementWidth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLoginMe, selectIsAuth } from 'shared/config/redux/slices/auth';

function App() {
  const { theme } = useTheme();
  const [ref, width] = useElementWidth();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoginMe());
  }, []);


  return (
    <div className={`App ${theme}`} ref={ref}>
      <Header width={width}/>
      <AppRouter/>
    </div>
  );
}

export default App;
