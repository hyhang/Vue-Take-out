import Home from '../views/Home/Home.vue'
import Order from '../views/Order/Order.vue'
import Personal from '../views/Personal/Personal.vue'
import Search from '../views/Search/Search.vue'
import Login from '../views/Login/Login.vue'
import Shop from '../views/Shop/Shop.vue'
import Foods from '../views/Shop/Foods/Foods.vue'
import Info from '../views/Shop/Info/Info.vue'
import Ratings from '../views/Shop/Ratings/Ratings.vue'

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
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/foods',
        component: Foods,
      },
      {
        path: '/shop/ratings',
        component: Ratings,
      },
      {
        path: '/shop/info',
        component: Info,
      },
      {
        path: '',
        redirect: '/shop/foods'
      }
    ]
  }
]