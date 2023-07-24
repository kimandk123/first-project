import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ACCOUNT_INFO } from "../constants/index"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      /*meta: {
        requiredLogin: true,
        isCheckLogin: true,
      },*/
    },
    {
      path: '/listCustomer',
      name: 'listCustomer',
      component: () => import('../views/Customer.vue'),
      meta: {
        requiredLogin: true,
        isCheckLogin: true,
      },
    },
    {
      path: '/listInfo',
      name: 'listInfo',
      component: () => import('../views/Info.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: (to, from, next) => {
        const account_info = JSON.parse(localStorage.getItem("ACCOUNT_INFO"));
          if (!account_info) {
            next()
          } else {
            next('/')
          }
      }
    },
  ],
});
router.beforeEach((to, from, next) => {
  const account_info = JSON.parse(localStorage.getItem("ACCOUNT_INFO"))
  console.log(to)
  if (to.meta.requiredLogin) {
    if (!account_info) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
});
export default router 
