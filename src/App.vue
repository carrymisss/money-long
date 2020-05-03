<template>
   <div id="app">
      <a-layout class="c-page">
         <Header />
         <Content />
      </a-layout>
   </div>
</template>

<script>

import Header from './components/Header.vue';
import Content from './components/Content.vue';

export default {
   name: 'App',
   components: {
      Header, Content
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
</style>
