// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSession from 'vue-session'
import './vee-validate'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#ff3860',
  failedColor: 'red',
  thickness: '15px',
  position: 'relative',
  inverse: true,
  autoFinish: false
}

Vue.use(Buefy)
Vue.use(VueSession)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(VueProgressBar, options)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
