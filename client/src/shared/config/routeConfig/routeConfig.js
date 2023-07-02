import { FullPost, Home, Login, NotFound, Register } from 'pages';

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
  register: {
    path: '/register',
    element: <Register/>
  },
  not_found: {
    path: '*',
    element: <NotFound/>
  }
};
