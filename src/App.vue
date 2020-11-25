<template>
   <a-layout class="c-page">
      <c-header></c-header>
      <a-layout-content class="c-content">
         <router-view v-transition></router-view>
      </a-layout-content>
   </a-layout>
</template>

<script>
import Header from './components/Header'

export default {
   name: 'App',
   components: {
      'c-header': Header,
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
   }
   #vueg-background {
      width: auto !important;
   }
   .c-content {
		width: 100%;
      height: 100%;
      overflow-y: auto;
		max-width: 1140px;
      /* min-width: 1140px; */
		margin-left: auto !important;
		margin-right: auto !important;
		margin-top: 24px;
		margin-bottom: 24px;
		padding: 24px;
		min-height: 320px;
		background: #fff;
	}
</style>
