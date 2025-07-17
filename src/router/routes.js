import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'
import ContactUs from '@/views/home/ContactUs.vue'
import SignUp from '@/views/auth/SignUp.vue'
import SignIn from '@/views/auth/SignIn.vue'
import NotFound from '@/views/auth/NotFound.vue'
import AccessDenied from '@/views/auth/AccesDenied.vue'
import ProductList from '@/views/product/ProductList.vue'
import ProductUpsert from '@/views/product/ProductUpsert.vue'
import { APP_ROUTE_NAMES } from '@/constants/routeNames.js'
import { useAuthStore } from '@/stores/authStore.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: APP_ROUTE_NAMES.HOME,
      component: Home,
    },
    {
      path: '/contact',
      name: APP_ROUTE_NAMES.CONTACT_US,
      component: ContactUs,
    },
    {
      path: '/signup',
      name: APP_ROUTE_NAMES.SING_UP,
      component: SignUp,
    },
    {
      path: '/signin',
      name: APP_ROUTE_NAMES.SING_IN,
      component: SignIn,
    },
    {
      path: '/notfound',
      name: APP_ROUTE_NAMES.NOT_FOUND,
      component: NotFound,
    },
    {
      path: '/accessdenied',
      name: APP_ROUTE_NAMES.ACCESS_DENIED,
      component: AccessDenied,
    },
    {
      path: '/productlist',
      name: APP_ROUTE_NAMES.PRODUCT_LIST,
      component: ProductList,
      beforeEnter: [isAdmin],
    },
    {
      path: '/productupsert',
      name: APP_ROUTE_NAMES.PRODUCT_UPSERT,
      component: ProductUpsert,
      beforeEnter: [isAdmin],
    },
    {
      path: '/productupdate/:id',
      name: APP_ROUTE_NAMES.PRODUCT_UPDATE,
      component: ProductUpsert,
      beforeEnter: [isAdmin],

    },
  ],
})

router.beforeEach(async (toString, from) => {
  const authStore = useAuthStore()
  if (!authStore.initialized) {
    await authStore.initilazeAuth()
  }
})

function isAdmin() {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      return true
    } else {
      return { name: APP_ROUTE_NAMES.ACCESS_DENIED }
    }
  }
  else {
    return { name: APP_ROUTE_NAMES.SING_IN }
  }
}
function isAuthenticated() {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    return true;
  }
  else {
    return { name: APP_ROUTE_NAMES.SING_IN }
  }
}







export default router
