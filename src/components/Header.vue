<template>
	<a-layout-header  class="c-header">
		<div class="c-header__wrapper">
			<a-row type="flex" justify="space-between" align="middle">
				<a-space>
					<a-col>
						<a-button :type="btnHeaderColor" :loading="getLoading" :icon="btnHeaderIcon" size="large" @click="toPath">
							{{ btnHeaderText }}
						</a-button>
					</a-col>
					<a-col style="margin-right: auto;" v-if="(this.$route.path === '/')">
						<Configuration />
					</a-col>
				</a-space>
				<a-col class="d-flex">
					<a-avatar shape="square" size="large" icon="user" />
				</a-col>
			</a-row>
		</div>
	</a-layout-header>
</template>

<script>
import Configuration from './Configuration.vue'
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			btnHeaderText: null,
			btnHeaderIcon: '',
			btnHeaderColor: 'default',
		}
	},
	computed: {
		...mapGetters(['getLoading']),
	},
	updated() {
		if (this.$route.path === '/') {
			this.btnHeaderText = 'Всі валюти'
			this.btnHeaderIcon = 'unordered-list'
			this.btnHeaderColor = 'primary'
		} else {
			this.btnHeaderText = 'Конвертер'
			this.btnHeaderIcon = 'dollar'
			this.btnHeaderColor = 'danger'
		}
	},
	methods: {
		toPath() {
			if (this.$route.path === '/') {
				this.$router.push({ path: '/convert' })
			} else {
				this.$router.push({ path: '/' })
			}
		}
	},
	components: {
		Configuration
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
		padding: 0 15px;
		width: 100%;
		max-width: 1140px;
		/* min-width: 1140px; */
		margin-left: auto !important;
		margin-right: auto !important;
	}
</style>
