import Home from '../views/Home/Home.vue'
import Order from '../views/Order/Order.vue'
import Personal from '../views/Personal/Personal.vue'
import Search from '../views/Search/Search.vue'
import Login from '../views/Login/Login.vue'

export default [
  {
    path: '/home',
    component: Home,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/personal',
    component: Personal,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/home'
  }
]