import { Home, NotFound } from 'pages';
import FullPost from '../../../pages/FullPost';
import Login from '../../../pages/Login';

export const routeConfig = {
  home: {
    path: '/',
    element: <Home/>
  },
  full_post: {
    path: '/posts/:id',
    element: <FullPost/>
  },
  login: {
    path: '/login',
    element: <Login/>
  },
  not_found: {
    path: '*',
    element: <NotFound/>
  }
};
