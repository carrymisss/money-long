import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import vueg from 'vueg'

import 'ant-design-vue/dist/antd.css'

import store from './store.js'
import router from './router.js'
import i18n from './i18n'

Vue.config.productionTip = false

Vue.use(vueg, router, {
   duration: '.9',
   firstEntryDisable: true,
   firstEntryDuration: '0',
   enter: 'fadeIn',
   leave: 'fadeIn',
   sameDepthDisable: false,
   tabsDisable: true,
   shadow: false,
})

Vue.use(Antd)

new Vue({
   router,
   store,
   i18n,
   render: h => h(App)
}).$mount('#app')
