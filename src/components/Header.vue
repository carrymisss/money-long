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
				<a-col>
					<a-space style="display: flex; align-items: center;">
						<a-button @click="onChangeLanguage()" size="small">
							{{ this.$i18n.locale === 'ua' ? 'English' : 'Українська' }}
						</a-button>
						<a-spin :spinning="userLoading">
							<div class="spin-content">
								<a-tooltip placement="bottomRight">
									<template slot="title">
									<span>GitHub @{{ userLogin }} / money-long</span>
									</template>
									<a :href="userUrl" target="_blank">
										<a-avatar shape="square" size="large" icon="user" :src="userAvatar" />
									</a>
								</a-tooltip>
							</div>
						</a-spin>
					</a-space>
				</a-col>
			</a-row>
		</div>
	</a-layout-header>
</template>

<script>
import Configuration from './Configuration.vue'
import { mapGetters } from 'vuex'
import { Octokit } from '@octokit/core'
import { message } from 'ant-design-vue'

export default {
	data() {
		return {
			btnHeaderText: null,
			btnHeaderIcon: '',
			btnHeaderColor: 'default',
			locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALES.split(','),
			userAvatar: null,
			userLoading: true,
			userUrl: '#',
			userLogin: ''
		}
	},
	beforeMount() {
		const octokit = new Octokit({ auth: process.env.VUE_APP_PERSONAL_ACCESS_TOKEN_GITHUB });
		octokit.request('GET /user').then(({ data }) => {
			console.log(data);
			this.userAvatar = data.avatar_url
			this.userUrl = data.html_url + '/money-long'
			this.userLoading = false
			this.userLogin = data.login
		}).catch(err => {
			message.error(''+err)
		})
	},
	computed: {
		...mapGetters(['getLoading']),
	},
	updated() {
		if (this.$route.path === '/') {
			this.btnHeaderText = this.$t('list.mainButton')
			this.btnHeaderIcon = 'unordered-list'
			this.btnHeaderColor = 'primary'
		} else {
			this.btnHeaderText = this.$t('converter.mainButton')
			this.btnHeaderIcon = 'dollar'
			this.btnHeaderColor = 'danger'
		}
	},
	methods: {
		onChangeLanguage() {
			if (this.$i18n.locale === 'ua') {
				this.$i18n.locale = 'en'
				if (!localStorage.getItem('locale')) {
					localStorage.setItem('locale', 'en')
				} else localStorage.setItem('locale', 'en')
			} else {
				this.$i18n.locale = 'ua'
				if (!localStorage.getItem('locale')) {
					localStorage.setItem('locale', 'ua')
				} else localStorage.setItem('locale', 'ua')
			}
		},
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
		width: 100%;
		max-width: 1140px;
		/* min-width: 1140px; */
		margin-left: auto !important;
		margin-right: auto !important;
	}
</style>
