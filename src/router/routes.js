
import useMenu from 'src/layouts/useMenu'
const { menus, getRouter } = useMenu();
const layoutChildrenRouters = getRouter(menus);
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("pages/login"),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('src/layouts'),
    children: layoutChildrenRouters,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/system-warm/404.vue')
  }
]

export default routes
