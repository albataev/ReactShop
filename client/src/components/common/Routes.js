/**
 * Global Routes
 */
const globalRoutes = [
  {
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/admin',
        exact: true,
        component: Admin
      },
      {
        path: '/user',
        component: User
      },
      {
        component: NotFound
      }
    ]
  }
];

export default globalRoutes;
