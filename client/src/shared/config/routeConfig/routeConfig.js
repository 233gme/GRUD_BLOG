import { AddPost, FullPost, Home, Login, NotFound, Register } from 'pages';

export const routeConfig = {
  home: {
    path: '/',
    element: <Home/>
  },
  full_post: {
    path: '/posts/:id',
    element: <FullPost/>
  },
  edit_post: {
    path: '/posts/:id/edit',
    element: <AddPost/>
  },
  add_post: {
    path: '/posts/create',
    element: <AddPost/>
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
