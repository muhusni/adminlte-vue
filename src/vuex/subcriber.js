import store from '../vuex/store'
import axios from 'axios'
// import Vue from 'vue'

store.subscribe((mutation) => {
  // console.log(mutation)
  switch (mutation.type) {
    case 'auth/SET_TOKEN':
      if (mutation.payload) {
        // console.log('isinya apaan')
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + mutation.payload
        // Vue.http.headers.common['Authorization'] = 'Bearer ' + mutation.payload
        localStorage.setItem('token', mutation.payload)
      } else {
        axios.defaults.headers.common['Authorization'] = null
        // Vue.http.headers.common['Authorization'] = null
        localStorage.removeItem('token')
      }
      break
  }
})
