import Vue from 'vue'
import VueRouter from 'vue-router'
import 'es6-promise/auto'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('./components/AllCurrency.vue'),
	},
	{
		path: '/convert',
		name: 'converter',
		component: () => import('./components/Converter.vue'),
	}
]

export default new VueRouter({
	routes,
	mode: 'history',
	base: '/'
})
