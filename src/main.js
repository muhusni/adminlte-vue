// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './lib/css'
import './lib/script'
import './lib/global'

import Vue from 'vue'
import App from './App'
import store from './vuex/store.js'
import router from './router'
import EventBus from './lib/eventBus.js'
import axios from 'axios'

require('./vuex/subcriber')

Vue.prototype.$bus = EventBus
Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['X-CSRF-TOKEN'] = null

router.beforeEach((to, from, next) => {
  // let tes = store.state.auth.token
  // store.dispatch('auth/attempt', localStorage.getItem('token'))
  // let tes = store.state.auth.token
  let tes = store.getters['auth/authenticated']
  // console.log('ini pas reload kan?')
  // console.log(tes)
  // setTimeout(() => { let tes =store.getters.['auth/authenticated'] }, 2000);
  if (to.matched.some((record) => record.meta.forAuth)) {
    if (tes) {
      next()
      // console.log('udah dapet token')
    } else {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
      // console.log('gak ada tokennya')
    }
  } else if (to.matched.some((record) => record.meta.forVisitors)) {
    if (tes) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
      App
    }
  })
})
