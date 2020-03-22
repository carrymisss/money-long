<template>
	<a-layout-content class="c-content">
		<router-view v-transition></router-view>
	</a-layout-content>
</template>

<script>
// import { Col, Row } from 'ant-design-vue';
export default {
	data() {
		return {

		}
	},
	// components: {
	// 		'a-col': Col, 'a-row': Row
  // },
}
</script>

<style scoped>
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
