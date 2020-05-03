<template>
	<a-layout-header  class="c-header">
		<div class="c-header__wrapper">
			<a-row type="flex" justify="space-between" align="middle">
				<a-col>
					<!-- <a-button :type="btnHeaderColor" :loading="this.$store.state.loading" :icon="btnHeaderIcon" size="large" @click="toPath">
						{{ btnHeaderText }}
					</a-button> -->
					<a-button v-if="(this.$route.path === '/')" type="danger" :loading="this.$store.state.loading" icon="dollar" size="large" @click="toPath">
						Конвертер
					</a-button>
					<a-button v-else type="primary" :loading="this.$store.state.loading" icon="project" size="large" @click="toPath">
						Всі валюти
					</a-button>
				</a-col>
				<a-col v-if="(this.$route.path === '/')">
					<Configuration />
				</a-col>
				<a-col class="d-flex">
					<a-avatar shape="square" size="large" icon="user" />
				</a-col>
			</a-row>
		</div>
	</a-layout-header>
</template>

<script>
import { Button, Row, Col } from 'ant-design-vue';
import Configuration from './Configuration.vue';

export default {
	data() {
		return {
			// btnHeaderText: ' ',
			// btnHeaderIcon: '',
			// btnHeaderColor: 'default',
		}
	},
	mounted() {
		// setTimeout(() => {
		// 	this.$data.btnHeaderText = this.$route.meta.PbtnHeaderText;
		// 	this.$data.btnHeaderIcon = this.$route.meta.PbtnHeaderIcon;
		// 	this.$data.btnHeaderColor = this.$route.meta.PbtnHeaderColor;
		// }, 300)
	},
	methods: {
		toPath() {
			if (this.$route.path === '/') {
				this.$router.push({ path: '/convert' });
				// this.$data.btnHeaderText = 'Всі валюти';
				// this.$data.btnHeaderIcon = 'project';
				// this.$data.btnHeaderColor = 'primary';
			} else {
				this.$router.push({ path: '/' });
				// this.$data.btnHeaderText = 'Конвертер';
				// this.$data.btnHeaderIcon = 'dollar';
				// this.$data.btnHeaderColor = 'danger';
			}
		}
	},
	components: {
		'a-button': Button, 'a-row': Row, 'a-col': Col, Configuration
  }
}
</script>

<style scoped>
	.d-flex {
		display: -webkit-flex;
		display: -ms-flex;
		display: flex;
	}
	.c-header {
		background-color: #fff;
	}
	.c-header__wrapper {
		width: 100%;
		max-width: 1140px;
		margin-left: auto !important;
		margin-right: auto !important;
	}
</style>
