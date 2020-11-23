import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import api from '@/api/index'
import '@/assets/css/global.less'
import '@/assets/fonts/iconfont.less'

Vue.config.productionTip = false

Vue.prototype.$api = api

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
