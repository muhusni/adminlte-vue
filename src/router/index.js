import Vue from 'vue'
import VueRouter from 'vue-router'
import Full from 'Full.vue'
import Login from 'pages/Login.vue'
import Home from 'pages/Home.vue'
import Products from 'pages/ProductsView.vue'
import Users from 'pages/UsersView.vue'
import UserShow from 'pages/UserShow.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/',
      name: 'Home',
      component: Full,
      children: [
        {
          path: '/',
          name: 'Hello',
          component: Home,
          meta: {
            forAuth: true
          }
        },
        {
          path: '/products',
          name: 'Products',
          component: Products,
          meta: {
            forAuth: true
          }
        },
        {
          path: '/users',
          name: 'Users',
          component: Users,
          meta: {
            forAuth: true
          }
        },
        {
          path: '/users/:id',
          name: 'Users Show',
          component: UserShow,
          meta: {
            forAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        forVisitors: true
      }
    }
  ],
  linkActiveClass: 'active'
})
