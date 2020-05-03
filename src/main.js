import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import vueg from 'vueg';
import currencyFilter from '@/filters/currency.filter';

import 'ant-design-vue/dist/antd.css';

import store from './store.js';
import router from './router.js';

Vue.config.productionTip = false;
Vue.filter('currency', currencyFilter);

Vue.use(vueg, router, {
   duration: '.9',
   firstEntryDisable: true,
   firstEntryDuration: '0',
   enter: 'fadeIn',
   leave: 'fadeIn',
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
