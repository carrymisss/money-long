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
   data() {
      return {

      }
   },
   beforeMount() {
      this.$store.dispatch('applyCurrency')
   }
}
</script>

<style>
   .c-page {
      min-height: 100vh !important;
   }
   #vueg-background {
      width: auto !important;
   }
   .c-content {
		width: 100%;
		max-width: 1140px;
		margin-left: auto !important;
		margin-right: auto !important;
		margin-top: 24px;
		margin-bottom: 24px;
		padding: 24px;
		min-height: 320px;
		background: #fff;
	}
</style>
