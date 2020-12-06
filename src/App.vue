<template>
   <a-layout class="c-page">
      <Header />
      <a-layout-content class="c-content">
         <router-view v-transition></router-view>
      </a-layout-content>
      <a class="api_by" target="_blank" href="https://www.exchangerate-api.com">Currency Conversion by ExchangeRate-API.com</a>
   </a-layout>
</template>

<script>
import Header from './components/Header'

export default {
   name: 'App',
   components: {
      Header
   },
   beforeMount() {
      // if (localStorage.length <= 1) {
      //    this.$store.dispatch('applyCurrency')
      // } else {
      //    this.$store.dispatch('setFromStorage')
      // }
      this.$store.dispatch('applyCurrency')
   }
}
</script>

<style>
   .c-page {
      height: 100vh;
      min-height: 100vh !important;
      position: relative;
   }
   #vueg-background {
      width: auto !important;
   }
   .c-content {
		width: 100%;
      height: 100%;
      overflow-y: auto;
		max-width: 1140px;
      min-width: 1140px;
		margin-left: auto !important;
		margin-right: auto !important;
		margin-top: 24px;
		margin-bottom: 24px;
		padding: 24px;
		min-height: 320px;
		background: #fff;
	}
   .api_by {
      position: absolute;
      bottom: 24px;
      right: 0;
      width: max-content;
      height: max-content;
      display: inline-block;
      font-size: 10px;
      color: #d3d3d399;
      padding: 0 5px;
      background-color: #fff;
   }
</style>
