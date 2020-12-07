<template>
   <a-layout class="c-page">
      <Header />
      <a-layout-content class="c-content">
         <router-view v-transition></router-view>
      </a-layout-content>
      <div class="api_by">
         <a target="_blank" href="https://www.exchangerate-api.com">Currency Conversion by ExchangeRate-API.com</a>
      </div>
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
      min-width: 1140px;
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
      position: relative;
	}
   .api_by {
      position: absolute;
      bottom: 24px;
      right: 0;
      z-index: 11100;
      left: 50%;
      transform: translateX(-50%);
      text-align: right;
      width: 1140px;
      height: 15px;
      display: inline-block;
      font-size: 10px;
      padding: 0 5px;
      background: transparent;
   }
   .api_by a {
      background-color: #fff;
      color: #d3d3d361;
      height: 15px;
   }
</style>
