import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import vueg from 'vueg';

import 'ant-design-vue/dist/antd.css';

import store from './store.js';
import router from './router.js';

Vue.config.productionTip = false;


Vue.use(vueg, router, {
   duration: '.5',
   firstEntryDisable: true,
   firstEntryDuration: '0',
   enter: 'fadeInDown',
   leave: 'fadeInUp',
   sameDepthDisable: false,
   tabsDisable: true,
   shadow: false,
});
Vue.use(Antd);

new Vue({
   router,
   store,
   render: h => h(App),
}).$mount('#app');
