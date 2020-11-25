<template>
	<a-row type="flex" justify="center" align="middle">
		<a-col span="18">
			<a-alert v-if="getMarkeredLength > 0" type="warning" class="c-marked-currency">
				<template slot="description">
					<a-list itemLayout="horizontal" :dataSource="getMarkered" :loading="getLoading" bordered>
						<a-list-item class="item-marked" slot="renderItem" slot-scope="item">
							<a-button @click="unMarkCurrency(item[0])" class="btn-marked" slot="actions" type="danger" shape="circle"><i class="fas fa-bookmark"></i></a-button>
							<a-list-item-meta>
								<span slot="title">
									{{ item[0] }}								
									<a-popover placement="right" :title="new Intl.NumberFormat('ua-UK', { style: 'currency', currency: item[0], currencyDisplay: 'name' }).format(item[1]).split(' ').slice(1).join(' ').charAt(0).toUpperCase() + new Intl.NumberFormat('ua-UK', { style: 'currency', currency: item[0], currencyDisplay: 'name' }).format(item[1]).split(' ').slice(1).join(' ').slice(1)">
										<span slot="content">
											<b>Валюта в країнах:</b> {{ gac(item[0]) }}<br/>
										</span>
										<i class="far fa-question-circle iuiui"></i>
									</a-popover>
									<a-badge class="c-base-badge" v-if="item[2]" count="base" />
								</span>
								<a-avatar class="flag-avatar" slot="avatar" :src="`./flags/${item[0]}.png`" />
							</a-list-item-meta>
							<span class="c-currency__value">{{ new Intl.NumberFormat('ua-UK', { style: 'currency', currency: item[0] }).format(item[1]) }}</span>
						</a-list-item>
					</a-list>
				</template>
			</a-alert>

			<a-list v-if="getCurrencyLength > 0" class="c-currency-list" itemLayout="horizontal" :dataSource="getCurrency" bordered :loading="getLoading">
				<a-list-item slot="renderItem" slot-scope="item" >
					<a-button @click="MarkCurrency(item[0])" slot="actions" type="danger" shape="circle" class="btn-notmarked"><i class="fas fa-bookmark"></i></a-button>
					<a-list-item-meta>
						<span slot="title">
							{{ item[0] }}								
							<a-popover placement="right" :title="new Intl.NumberFormat('ua-UK', { style: 'currency', currency: item[0], currencyDisplay: 'name' }).format(item[1]).split(' ').slice(1).join(' ').charAt(0).toUpperCase() + new Intl.NumberFormat('ua-UK', { style: 'currency', currency: item[0], currencyDisplay: 'name' }).format(item[1]).split(' ').slice(1).join(' ').slice(1)">
								<span slot="content">
									<b>Валюта в країнах:</b> {{ gac(item[0]) }}<br/>
								</span>
								<i class="far fa-question-circle iuiui"></i>
							</a-popover>
							<a-badge class="c-base-badge" v-if="item[2]" count="base" />
						</span>
						<a-avatar class="flag-avatar" slot="avatar" :src="`./flags/${item[0]}.png`" />
					</a-list-item-meta>
					<span class="c-currency__value">{{ new Intl.NumberFormat('ua-UK', { style: 'currency', currency: item[0] }).format(item[1]) }}</span>
				</a-list-item>
			</a-list>
		</a-col>
	</a-row>
</template>

<script>
import { List, Row, Col, Button, Popover, Divider, Alert } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import { getAllCountriesByCurrencyOrSymbol } from 'iso-country-currency'

/* eslint-disable */

export default {
	computed: {
		...mapGetters(['getCurrency', 'getMarkered', 'getLoading', 'getMarkeredLength', 'getCurrencyLength']),
	},
	methods: {
		gac(code) {
			return getAllCountriesByCurrencyOrSymbol('currency', code).join(', ')
		},
		MarkCurrency(index) {
			this.$store.commit('setMarkered', index)
		},
		unMarkCurrency(index) {
			this.$store.commit('setUnMarkered', index)
		}
	},
	components: {
		'a-list': List, 'a-row': Row, 'a-col': Col, 'a-button': Button, 'a-popover': Popover, 'a-divider': Divider, 'a-alert': Alert
	}
}
</script>

<style>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
	.ant-popover {
		max-width: 400px;
	}
	.iuiui {
		margin-left: 2px;
		font-size: 12px;
		cursor: help;
	}
	.flag-avatar {
		box-shadow: 0 0 10px -4px #292929;
	}
	.ant-list-item-meta-title span {
		display: -webkit-flex;
		display: -ms-flex;
		display: flex;
		-ms-align-items: center;
		align-items: center;
		text-align: center;
	}
	.ant-list-item-action li {
		display: -webkit-inline-flex;
		display: -ms-inline-flex;
		display: inline-flex;
	}
	.ant-list-item-meta-title {
		margin: 0;
		font-size: 18px;
	}
	.ant-list-item-meta {
		-ms-align-items: center;
		align-items: center;
	}
	.ant-list-item-content {
		justify-content: center !important;
	}
	.c-base-badge {
		margin-left: 10px;
	}
	.c-marked-currency {
		margin-bottom: 20px;
		padding: 0 !important;
	}
	.c-marked-currency .ant-list-bordered {
		border: none;
	}
	.c-currency__value {
		font-size: 18px;
	}
	.c-currency-list.ant-list-bordered {
		border-color: #fff;
		border-radius: 0;
	}
	.c-marked-currency.ant-list-bordered {
		border-color: transparent;
	}
	.btn-marked {
		position: relative;
		background-color: #fff;
		border-color: #d9d9d9;
		color: #434343;
	}
	.btn-marked:hover {
		background-color: #fff;
		border-color: #000;
		color: #434343;
	}
	.btn-marked:active {
		background-color: #d9d9d9;
	}
	.btn-marked i {
		-webkit-transition: 300ms;
		-o-transition: 300ms;
		transition: 300ms;
		-webkit-transition-timing-function: easy-in-out;
		-o-transition-timing-function: easy-in-out;
		transition-timing-function: easy-in-out;
		position: absolute;
		top: 19px;
		left: 50%;
		transform: translateX(-50%);
	}
	.btn-marked i:after {
		content: "\f02e";
		position: absolute;
		width: 100%;
		left: 50%;
		opacity: 1;
		transform: translateX(-50%);
		top: -10px;
		-webkit-transition: 300ms;
		-o-transition: 300ms;
		transition: 300ms;
		-webkit-transition-timing-function: easy-in-out;
		-o-transition-timing-function: easy-in-out;
		transition-timing-function: easy-in-out;
	}
	.btn-marked:hover i {
		top: 9px;
	}
	.btn-marked:hover i:after {
		top: 0;
	}
	.btn-marked:focus {
		background-color: #d9d9d9;
		border-color: #434343;
		color: #434343;
	}
	/* .btn-notmarked {
		color: #434343;
	}
	.btn-notmarked i {
		-webkit-transition: 300ms;
		-o-transition: 300ms;
		transition: 300ms;
		-webkit-transition-timing-function: easy-in-out;
		-o-transition-timing-function: easy-in-out;
		transition-timing-function: easy-in-out;
		position: absolute;
		top: 7px;
		left: 50%;
		transform: translateX(-50%);
	}
	.btn-notmarked i:after {
		content: "\f02e";
		position: absolute;
		width: 100%;
		left: 50%;
		opacity: 1;
		transform: translateX(-50%);
		top: 0;
		-webkit-transition: 300ms;
		-o-transition: 300ms;
		transition: 300ms;
		-webkit-transition-timing-function: easy-in-out;
		-o-transition-timing-function: easy-in-out;
		transition-timing-function: easy-in-out;
	}
	.btn-notmarked:hover i {
		top: 19px;
	}
	.btn-notmarked:hover i:after {
		top: -12px;
	} */
</style>
