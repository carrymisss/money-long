<template>
	<a-layout-header  class="c-header">
		<a-row type="flex" justify="space-between" align="middle">
			<a-col>
				<a-button :type="btnHeaderColor" :loading="loading" :icon="btnHeaderIcon" size="large" @click="toPath">
					{{ btnHeaderText }}
				</a-button>
			</a-col>
			<a-col>
				<a-avatar shape="square" size="large" icon="user" />
			</a-col>
		</a-row>
	</a-layout-header>
</template>

<script>
import { Button, Row, Col } from 'ant-design-vue';
export default {
	data() {
		return {
			btnHeaderText: '',
			btnHeaderIcon: '',
			btnHeaderColor: 'default',
			loading: true
		}
	},
	beforeCreate() {
		setTimeout(() => {
			this.$data.btnHeaderText = this.$route.meta.PbtnHeaderText;
			this.$data.btnHeaderIcon = this.$route.meta.PbtnHeaderIcon;
			this.$data.btnHeaderColor = this.$route.meta.PbtnHeaderColor;
			this.$data.loading = false;
		}, 500)
	},
	methods: {
		toPath() {
			if (this.$route.path === '/') {
				this.$router.push({ path: '/convert' });
				this.$data.btnHeaderText = 'Всі валюти';
				this.$data.btnHeaderIcon = 'project';
				this.$data.btnHeaderColor = 'primary';
			} else {
				this.$router.push({ path: '/' });
				this.$data.btnHeaderText = 'Конвертер';
				this.$data.btnHeaderIcon = 'dollar';
				this.$data.btnHeaderColor = 'danger';
			}
		}
	},
	components: {
		'a-button': Button, 'a-row': Row, 'a-col': Col
  }
}
</script>

<style scoped>
	.c-header {
		background-color: #fff;
	}
</style>
