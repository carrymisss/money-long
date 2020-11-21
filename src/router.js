import Vue from 'vue'
import VueRouter from 'vue-router'
import 'es6-promise/auto'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('./components/AllCurrency.vue'),
		meta: {
			PbtnHeaderText: 'Конвертер',
			PbtnHeaderIcon: 'dollar',
			PbtnHeaderColor: 'danger',
		}
	},
	{
		path: '/convert',
		name: 'converter',
		component: () => import('./components/Converter.vue'),
		meta: {
			PbtnHeaderText: 'Всі валюти',
			PbtnHeaderIcon: 'project',
			PbtnHeaderColor: 'primary',
		}
	}
]

export default new VueRouter({
	routes,
	mode: 'history',
	base: '/'
})
