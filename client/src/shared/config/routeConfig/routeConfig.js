import { Home, NotFound } from 'pages';

export const routeConfig = {
  home: {
    path: '/',
    element: <Home/>
  },
  not_found: {
    path: '*',
    element: <NotFound/>
  }
};
